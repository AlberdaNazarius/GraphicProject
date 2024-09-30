import FilterList from "@/components/lists/FilterList";
import GradationList from "@/components/lists/GradationList";

export default function NavBar() {
  return (
    <nav className="mb-8 fixed left-0 right-0 top-0 bg-[#444647] h-12">
      <div className="dropdown ">
        <div tabIndex={0} role="button"
             className="btn bg-[#6d6f70] border-none rounded-none hover:bg-[#7f8385]">Method
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <FilterList/>
        </ul>
      </div>
      <div className="dropdown ">
        <div tabIndex={1} role="button"
             className="btn bg-[#6d6f70] border-none rounded-none hover:bg-[#7f8385]">Gradiation
        </div>
        <ul tabIndex={1} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <GradationList/>
        </ul>
      </div>
    </nav>
  )
}