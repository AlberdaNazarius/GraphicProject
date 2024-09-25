export default function NavBar () {
  return(
    <nav className="mb-8 fixed left-0 right-0 top-0 bg-[#444647] h-12">
      <div className="dropdown ">
        <div tabIndex={0} role="button" className="btn bg-[#6d6f70] border-none rounded-none hover:bg-[#7f8385]">Method</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a>Gauss</a></li>
          <li><a>Laplace</a></li>
          <li><a>Prewitt (V)</a></li>
          <li><a>Prewitt (H)</a></li>
          <li><a>Sobel (V)</a></li>
          <li><a>Sobel (H)</a></li>
          <li><a>Softening</a></li>
          <li><a>Hipass</a></li>
          <li><a>Sharpen</a></li>
          <li><a>Edge detection</a></li>
        </ul>
      </div>
    </nav>
  )
}