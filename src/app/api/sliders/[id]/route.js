import Slider from "@/models/sliderModel";
import cloudinary from "@/lib/cloudinary";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";

export const PATCH = async (req, { params }) => {
    await dbConnect();
    const { id } = params;

    if (!id) {
        return new Response('Slider ID is required', { status: 400 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response('No file uploaded', { status: 400 });
        }

        // Upload to Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'sliders' }, // Optional folder
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        // Update slider in MongoDB
        const updatedSlider = await Slider.findByIdAndUpdate(id, {
            img: result.secure_url,
            public_id: result.public_id,
            isActive: true, // Assuming you want to set it active by default
        }, { new: true });

        if (!updatedSlider) {
            return new Response('Slider not found', { status: 404 });
        }

        return new Response(JSON.stringify(updatedSlider), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response('Failed to update slider', {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export const DELETE = async (req, { params }) => {
  await dbConnect();
  const { id } = params;

  // Validate ID format (Mongoose ObjectId)
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid slider ID format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Find the slider
    const slider = await Slider.findById(id);
    if (!slider) {
      return new Response(JSON.stringify({ error: 'Slider not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      }); // ✅ Fixed: added missing parenthesis here
    }

    // Only attempt Cloudinary deletion if public_id exists
    if (slider.public_id) {
      try {
        await cloudinary.uploader.destroy(slider.public_id);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion failed:', cloudinaryError);
        // Continue with MongoDB deletion even if Cloudinary fails
      }
    }

    // Delete from MongoDB
    await Slider.findByIdAndDelete(id);

    return new Response(JSON.stringify({
      success: true,
      message: 'Slider deleted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
  return new Response(JSON.stringify({
    error: 'Internal server error',
    details: error.message // Show detailed error for debugging
  }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

};
