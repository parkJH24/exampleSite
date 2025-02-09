import LineAnimation from "./animations/LineAnimation"

const FooterContainer = ()=>{
    return(
        <footer className=" bg-white text-black relative ">
            <LineAnimation/>
            <div className="text-[1.4rem] box-border px-[10rem] border-t-2 py-[3.6rem]">
            © 2024 Semicolondev
            </div>
          
        </footer>

    )
}

export default FooterContainer