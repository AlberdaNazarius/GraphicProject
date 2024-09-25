import Matrix from "@/components/matrix/Matrix";
import FunctionalZone from "@/components/FunctionalZone";


export default function Home() {
  return (
    <main className='flex justify-center'>
      <div>
        <Matrix dimension={3}/>
        <div className="my-3"></div>
        <FunctionalZone/>
      </div>
    </main>
  );
}
