import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={"/loading.png"}
        alt="loading"
        width={40}
        height={40}
        className="animate-spin text-blue-500 invert"
      />
    </div>
  );
}
