import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } bg-light z-50 h-[62px] shadow-[0px_4px_27.21px_0px_rgba(0,0,0,0.09)]`}
      >
        <ul className="flex justify-around content-center h-full items-center">
          <li>
            <Link to="/">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>QYK2</title>
                <path
                  fill="#1d1d1b"
                  d="M1.704 13.502c-1.136-1.24-1.704-2.764-1.704-4.572s0.568-3.329 1.704-4.563c1.136-1.234 2.571-1.851 4.306-1.851s3.173 0.617 4.315 1.851c1.141 1.234 1.712 2.755 1.712 4.563 0 1.066-0.214 2.054-0.642 2.964s-1.019 1.66-1.772 2.251c2.34 1.437 4.144 2.375 5.411 2.816 1.507 0.522 2.865 0.782 4.075 0.782 0.696 0 1.49-0.093 2.38-0.278s1.444-0.335 1.832-0.532l0.291 0.445c-0.445 0.232-1.127 0.458-2.046 0.678s-1.738 0.33-2.457 0.33-1.481-0.090-2.286-0.269c-0.805-0.18-1.496-0.368-2.072-0.565s-1.293-0.51-2.149-0.939c-0.856-0.429-1.47-0.75-1.841-0.965s-0.973-0.565-1.806-1.052c-0.902 0.51-1.884 0.765-2.945 0.765-1.735 0-3.171-0.62-4.306-1.86zM2.312 4.907c-0.948 1.084-1.421 2.425-1.421 4.024s0.476 2.943 1.43 4.033c0.953 1.089 2.183 1.634 3.69 1.634 0.822 0 1.564-0.168 2.226-0.504-1.427-0.985-2.551-1.477-3.373-1.477-0.514 0-0.931 0.093-1.25 0.278l-0.274-0.504c0.422-0.29 0.942-0.435 1.558-0.435s1.236 0.151 1.858 0.452c0.622 0.301 1.338 0.73 2.149 1.286 0.708-0.51 1.259-1.182 1.652-2.016s0.591-1.75 0.591-2.746c0-1.599-0.477-2.94-1.43-4.024s-2.189-1.625-3.707-1.625-2.751 0.542-3.699 1.625z"
                ></path>
                <path
                  fill="#1d1d1b"
                  d="M14.777 8.826h6.061v0.695h-6.061v-0.695z"
                ></path>
                <path
                  fill="#1d1d1b"
                  d="M27.071 15.153h-0.822v-4.45l-4.606-7.978h0.993l3.562 6.292c0.205 0.371 0.377 0.695 0.514 0.973 0.045-0.15 0.205-0.463 0.479-0.939l3.562-6.327h0.942l-4.623 8.013v4.415z"
                ></path>
                <path
                  fill="#e31d3e"
                  d="M9.623 14.145c2.34 1.437 4.144 2.375 5.411 2.816 1.507 0.522 2.865 0.782 4.075 0.782 0.696 0 1.49-0.093 2.38-0.278s1.424-0.352 1.812-0.548l0.311 0.462c-0.445 0.232-1.127 0.458-2.046 0.678s-1.738 0.33-2.457 0.33-1.481-0.090-2.286-0.269c-0.805-0.18-1.496-0.368-2.072-0.565s-1.293-0.51-2.149-0.939c-0.856-0.429-1.47-0.75-1.841-0.965s-0.973-0.565-1.806-1.052zM8.236 14.093c-1.427-0.985-2.551-1.477-3.373-1.477-0.514 0-0.931 0.093-1.25 0.278l-0.274-0.504c0.422-0.29 0.942-0.435 1.558-0.435s1.236 0.151 1.858 0.452c0.622 0.301 1.338 0.73 2.149 1.286z"
                ></path>
                <path
                  fill="#1d1d1b"
                  d="M24.124 16.916v12.428h-0.822v-12.428h0.822zM30.664 16.916l-5.205 6.014c0.696 0.846 1.498 1.79 2.406 2.833s1.495 1.686 1.764 1.929c0.268 0.243 0.479 0.426 0.634 0.548s0.391 0.255 0.71 0.4c0.319 0.145 0.662 0.241 1.028 0.287l-0.017 0.556c-0.685-0.012-1.25-0.119-1.695-0.322s-0.833-0.469-1.164-0.8c-0.331-0.33-1.053-1.141-2.166-2.433s-1.949-2.28-2.508-2.964l5.257-6.049h0.959z"
                ></path>
              </svg>
            </Link>
          </li>
          <li>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="h-[1.7rem] fill-primary" viewBox="0 0 32 32">
                <path d="M13.417 14.857h-11.703c-0.949 0-1.714-0.766-1.714-1.714v-11.429c0-0.949 0.766-1.714 1.714-1.714h11.703c0.949 0 1.714 0.766 1.714 1.714v11.429c0 0.949-0.766 1.714-1.714 1.714z" />
                <path d="M13.417 32h-11.703c-0.949 0-1.714-0.766-1.714-1.714v-11.429c0-0.949 0.766-1.714 1.714-1.714h11.703c0.949 0 1.714 0.766 1.714 1.714v11.429c0 0.949-0.766 1.714-1.714 1.714z" />
                <path d="M30.286 14.857h-11.703c-0.949 0-1.714-0.766-1.714-1.714v-11.429c0-0.949 0.766-1.714 1.714-1.714h11.703c0.949 0 1.714 0.766 1.714 1.714v11.429c0 0.949-0.766 1.714-1.714 1.714z" />
                <path d="M30.286 32h-11.703c-0.949 0-1.714-0.766-1.714-1.714v-11.429c0-0.949 0.766-1.714 1.714-1.714h11.703c0.949 0 1.714 0.766 1.714 1.714v11.429c0 0.949-0.766 1.714-1.714 1.714z" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      <nav
        className={`md:hidden fixed bottom-[62px] shadow-[0_4px_20px_rgba(13,2,3,0.17)] w-full h-fit p-[0.9rem] bg-light z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <ul className="flex flex-wrap justify-around items-center">
          <li className="h-fit m-[1.1rem] w-[40%]">
            <Link
              to="/"
              className="text-primary text-[0.9rem] p-[0.9rem] block text-center border-primary border-[1px] rounded-[2px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
          </li>
          <li className="h-fit m-[1.1rem] w-[40%]">
            <Link
              to="/creations"
              className="text-primary text-[0.9rem] p-[0.9rem] block text-center border-primary border-[1px] rounded-[2px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Créations
            </Link>
          </li>
          <li className="h-fit m-[1.1rem] w-[40%]">
            <Link
              to="/about"
              className="text-primary text-[0.9rem] p-[0.9rem] block text-center border-primary border-[1px] rounded-[2px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Mon Parcours
            </Link>
          </li>
          <li className="h-fit m-[1.1rem] w-[40%]">
            <Link
              to="/contact"
              className="text-primary text-[0.9rem] p-[0.9rem] block text-center border-primary border-[1px] rounded-[2px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul className="flex flex-wrap justify-around items-center">
          <li>
            <a
              href="https://www.instagram.com/yenkohnert/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="mt-[1.1rem] mb-[0.9rem] h-[1.7rem] w-auto fill-primary"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path d="M23.593 32h-15.186c-4.632 0-8.407-3.775-8.407-8.407v-15.186c0-4.632 3.775-8.407 8.407-8.407h15.186c4.632 0 8.407 3.775 8.407 8.407v15.186c0 4.632-3.775 8.407-8.407 8.407zM8.407 1.627c-3.742 0-6.78 3.037-6.78 6.78v15.186c0 3.742 3.037 6.78 6.78 6.78h15.186c3.742 0 6.78-3.037 6.78-6.78v-15.186c0-3.742-3.037-6.78-6.78-6.78h-15.186z" />
                <path d="M16.076 22.823c-0.369 0-0.738-0.033-1.106-0.087-1.443-0.228-2.744-0.9-3.775-1.931s-1.703-2.332-1.931-3.775c-0.228-1.443 0-2.885 0.651-4.187s1.692-2.343 2.983-3.016c1.291-0.673 2.744-0.911 4.187-0.694 1.475 0.217 2.809 0.889 3.862 1.942s1.725 2.408 1.942 3.862v0c0.217 1.443-0.033 2.885-0.705 4.187-0.673 1.291-1.714 2.321-3.016 2.983-0.965 0.488-2.018 0.738-3.081 0.738zM16.054 10.674c-0.835 0-1.66 0.206-2.419 0.597-0.987 0.51-1.779 1.313-2.278 2.3-0.499 0.998-0.673 2.104-0.499 3.2s0.683 2.094 1.475 2.885 1.79 1.302 2.885 1.475c1.096 0.174 2.202 0 3.2-0.499s1.79-1.291 2.3-2.278c0.51-0.987 0.694-2.094 0.532-3.2v0c-0.163-1.106-0.694-2.159-1.486-2.95s-1.822-1.313-2.951-1.486c-0.26-0.043-0.521-0.054-0.781-0.054z" />
                <path d="M26.609 7.311c0.065 0.477 0 0.955-0.228 1.388-0.217 0.423-0.575 0.77-0.998 0.987s-0.911 0.293-1.388 0.217c-0.477-0.076-0.911-0.304-1.247-0.64s-0.564-0.781-0.64-1.247c-0.076-0.477 0-0.955 0.217-1.388 0.217-0.423 0.564-0.781 0.987-0.998s0.911-0.304 1.388-0.228c0.488 0.076 0.933 0.293 1.28 0.64s0.575 0.792 0.64 1.28z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
