//파일명에서 index.d.ts의 **.d.ts**에서 d는 **"declaration"**을 의미합니다. 
//이는 해당 파일이 TypeScript의 타입 선언 파일임을 나타냅니다.

//드랍다은 메뉴 리스트
export interface MenuItem{
    id : string | number;
    label : string;
    children? : MenuItem [];//서브메뉴
    href ? : string
}

//dropDownMenuProps
export interface DropdownMenuProps{
    items : MenuItem[];
    onSelect? : (id : string | number) => void
}
//menuState 
export interface MenuState{
    open : boolean;
    activeItemId? :string | number
}