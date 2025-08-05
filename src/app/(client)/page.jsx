import Categories from "@/components/Home/Categories";
import HeroSlider from "@/components/Home/HeroSlider";
import Products from "@/components/Home/Products";

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <Categories/>
      <Products/>
    </div>
  );
}
