import LineAnimation from "./animations/LineAnimation"


const MainList = () => {
    return (
        <section className="bg-[#000000] pb-[20rem] ">
            <LineAnimation strokeColor="#000000" fillColor="#000000" />
            <h2 className="text-white text-[4.6rem] flex justify-center text-center mb-[12rem]">
                간단한 CSS 애니메이션부터 JavaScript 효과까지,<br />
                다양한 방식으로 구현하는 클론 코딩까지

            </h2>

            <ul className="flex justify-center gap-[1.2rem] max-w-[100rem] flex-wrap m-auto">
                <li className="bg-[#121212] border border-[#222] rounded-lg p-[1.6rem] flex items-center gap-3 text-white text-[1.6rem] tracking-[0.2rem]">
                    <div>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.272 15.395c-9.387 0-16.997 7.61-16.997 16.996 0 9.387 7.61 16.997 16.997 16.997 2.158 0 4.22-.402 6.117-1.134 1.264-.488 2.977-1.582 4.15-2.408 1.247-.877 1.873-1.463 2.844-2.64a16.923 16.923 0 003.885-10.815c0-9.386-7.61-16.996-16.996-16.996zM13.675 32.391c0-10.27 8.326-18.596 18.597-18.596 10.27 0 18.596 8.326 18.596 18.596 0 4.495-1.596 8.62-4.251 11.835-1.06 1.283-1.79 1.967-3.157 2.928-1.18.831-3.032 2.028-4.495 2.592a18.554 18.554 0 01-6.693 1.242c-10.27 0-18.597-8.326-18.597-18.597z" fill="#FFFDF6">
                            </path>
                            <path d="M21.99 31.121h0l2.938 2.956 3.076 3.238.027.027 3.777 3.682a2 2 0 002.815-.022L52.02 23.489a2 2 0 00.025-2.794l-.722.692.722-.692-2.537-2.645a2 2 0 00-2.869-.018L32.931 31.958l-5.867-5.906a2 2 0 00-2.838 0l-2.235 2.25a2 2 0 000 2.82z" fill="#BFFEFF" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                    <p>HTML, CSS ANIMATION</p>
                </li>
                <li className="bg-[#121212] border border-[#222] rounded-lg p-[1.6rem] flex items-center gap-3 text-white text-[1.6rem] tracking-[0.2rem]">
                    <div>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.272 15.395c-9.387 0-16.997 7.61-16.997 16.996 0 9.387 7.61 16.997 16.997 16.997 2.158 0 4.22-.402 6.117-1.134 1.264-.488 2.977-1.582 4.15-2.408 1.247-.877 1.873-1.463 2.844-2.64a16.923 16.923 0 003.885-10.815c0-9.386-7.61-16.996-16.996-16.996zM13.675 32.391c0-10.27 8.326-18.596 18.597-18.596 10.27 0 18.596 8.326 18.596 18.596 0 4.495-1.596 8.62-4.251 11.835-1.06 1.283-1.79 1.967-3.157 2.928-1.18.831-3.032 2.028-4.495 2.592a18.554 18.554 0 01-6.693 1.242c-10.27 0-18.597-8.326-18.597-18.597z" fill="#FFFDF6">
                            </path>
                            <path d="M21.99 31.121h0l2.938 2.956 3.076 3.238.027.027 3.777 3.682a2 2 0 002.815-.022L52.02 23.489a2 2 0 00.025-2.794l-.722.692.722-.692-2.537-2.645a2 2 0 00-2.869-.018L32.931 31.958l-5.867-5.906a2 2 0 00-2.838 0l-2.235 2.25a2 2 0 000 2.82z" fill="#BFFEFF" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                   <p>JAVASCRIPT</p>
                </li>
                <li className="bg-[#121212] border border-[#222] rounded-lg p-[1.6rem] flex items-center gap-3 text-white text-[1.6rem] tracking-[0.2rem]">
                    <div>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.272 15.395c-9.387 0-16.997 7.61-16.997 16.996 0 9.387 7.61 16.997 16.997 16.997 2.158 0 4.22-.402 6.117-1.134 1.264-.488 2.977-1.582 4.15-2.408 1.247-.877 1.873-1.463 2.844-2.64a16.923 16.923 0 003.885-10.815c0-9.386-7.61-16.996-16.996-16.996zM13.675 32.391c0-10.27 8.326-18.596 18.597-18.596 10.27 0 18.596 8.326 18.596 18.596 0 4.495-1.596 8.62-4.251 11.835-1.06 1.283-1.79 1.967-3.157 2.928-1.18.831-3.032 2.028-4.495 2.592a18.554 18.554 0 01-6.693 1.242c-10.27 0-18.597-8.326-18.597-18.597z" fill="#FFFDF6">
                            </path>
                            <path d="M21.99 31.121h0l2.938 2.956 3.076 3.238.027.027 3.777 3.682a2 2 0 002.815-.022L52.02 23.489a2 2 0 00.025-2.794l-.722.692.722-.692-2.537-2.645a2 2 0 00-2.869-.018L32.931 31.958l-5.867-5.906a2 2 0 00-2.838 0l-2.235 2.25a2 2 0 000 2.82z" fill="#BFFEFF" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                    <p>RESPONSIVE WEB</p>
                    </li>
                    <li className="bg-[#121212] border border-[#222] rounded-lg p-[1.6rem] flex items-center gap-3 text-white text-[1.6rem] tracking-[0.2rem]">
                    <div>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.272 15.395c-9.387 0-16.997 7.61-16.997 16.996 0 9.387 7.61 16.997 16.997 16.997 2.158 0 4.22-.402 6.117-1.134 1.264-.488 2.977-1.582 4.15-2.408 1.247-.877 1.873-1.463 2.844-2.64a16.923 16.923 0 003.885-10.815c0-9.386-7.61-16.996-16.996-16.996zM13.675 32.391c0-10.27 8.326-18.596 18.597-18.596 10.27 0 18.596 8.326 18.596 18.596 0 4.495-1.596 8.62-4.251 11.835-1.06 1.283-1.79 1.967-3.157 2.928-1.18.831-3.032 2.028-4.495 2.592a18.554 18.554 0 01-6.693 1.242c-10.27 0-18.597-8.326-18.597-18.597z" fill="#FFFDF6">
                            </path>
                            <path d="M21.99 31.121h0l2.938 2.956 3.076 3.238.027.027 3.777 3.682a2 2 0 002.815-.022L52.02 23.489a2 2 0 00.025-2.794l-.722.692.722-.692-2.537-2.645a2 2 0 00-2.869-.018L32.931 31.958l-5.867-5.906a2 2 0 00-2.838 0l-2.235 2.25a2 2 0 000 2.82z" fill="#BFFEFF" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                    <p>WEB ACCESSIBIKITY</p>
                    </li>
                    <li className="bg-[#121212] border border-[#222] rounded-lg p-[1.6rem] flex items-center gap-3 text-white text-[1.6rem] tracking-[0.2rem]">
                    <div>
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.272 15.395c-9.387 0-16.997 7.61-16.997 16.996 0 9.387 7.61 16.997 16.997 16.997 2.158 0 4.22-.402 6.117-1.134 1.264-.488 2.977-1.582 4.15-2.408 1.247-.877 1.873-1.463 2.844-2.64a16.923 16.923 0 003.885-10.815c0-9.386-7.61-16.996-16.996-16.996zM13.675 32.391c0-10.27 8.326-18.596 18.597-18.596 10.27 0 18.596 8.326 18.596 18.596 0 4.495-1.596 8.62-4.251 11.835-1.06 1.283-1.79 1.967-3.157 2.928-1.18.831-3.032 2.028-4.495 2.592a18.554 18.554 0 01-6.693 1.242c-10.27 0-18.597-8.326-18.597-18.597z" fill="#FFFDF6">
                            </path>
                            <path d="M21.99 31.121h0l2.938 2.956 3.076 3.238.027.027 3.777 3.682a2 2 0 002.815-.022L52.02 23.489a2 2 0 00.025-2.794l-.722.692.722-.692-2.537-2.645a2 2 0 00-2.869-.018L32.931 31.958l-5.867-5.906a2 2 0 00-2.838 0l-2.235 2.25a2 2 0 000 2.82z" fill="#BFFEFF" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </div>
                    <p>REACT,NEXTJS</p>
                    </li>
            </ul>
        </section>
    )
}

export default MainList