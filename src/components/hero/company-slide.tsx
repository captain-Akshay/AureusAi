import Airbnb from "@/assets/airbnb.svg";
import Apple from "@/assets/apple.svg";
import Disney from "@/assets/disney.svg";
import Facebook from "@/assets/facebook.svg";
import Quora from "@/assets/quora.svg";
import Samsung from "@/assets/samsung.svg";
import Sass from "@/assets/sass.svg";
import Spark from "@/assets/spark.svg";
import Image from "next/image";
function Company() {
  return (
    <div className="w-full inline-flex flex-nowrap bg-gradient-to-b from-white via-purple-300 to-white  dark:from-black dark:to-black">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <Image src={Facebook} alt="Facebook" width={200} />
        </li>
        <li>
          <Image src={Disney} alt="Disney" width={200} />
        </li>
        <li>
          <Image src={Airbnb} alt="Airbnb" width={200} />
        </li>
        <li>
          <Image src={Apple} alt="Apple" width={200} />
        </li>
        <li>
          <Image src={Spark} alt="Spark" width={200} />
        </li>
        <li>
          <Image src={Samsung} alt="Samsung" width={200} />
        </li>
        <li>
          <Image src={Quora} alt="Quora" width={200} />
        </li>
        <li>
          <Image src={Sass} alt="Sass" width={200} />
        </li>
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        <li>
          <Image src={Facebook} alt="Facebook" width={200} />
        </li>
        <li>
          <Image src={Disney} alt="Disney" width={200} />
        </li>
        <li>
          <Image src={Airbnb} alt="Airbnb" width={200} />
        </li>
        <li>
          <Image src={Apple} alt="Apple" width={200} />
        </li>
        <li>
          <Image src={Spark} alt="Spark" width={200} />
        </li>
        <li>
          <Image src={Samsung} alt="Samsung" width={200} />
        </li>
        <li>
          <Image src={Quora} alt="Quora" width={200} />
        </li>
        <li>
          <Image src={Sass} alt="Sass" width={200} />
        </li>
      </ul>
    </div>
  );
}

export default Company;
