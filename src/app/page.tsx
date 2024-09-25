import Matrix from "@/components/matrix/Matrix";
import ImageUploader from "@/components/ImageUploader";


export default function Home() {
  return (
    <main className='flex justify-center'>
      <div>
        <Matrix dimension={3}/>
        <div className="my-3"></div>
        <ImageUploader/>
      </div>
    </main>
  );
}
