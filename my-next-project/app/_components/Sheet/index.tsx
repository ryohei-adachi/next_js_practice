import style from "./index.module.css";

type Props = {
    children: React.ReactNode;
}

export default function Sheet({children}:Props) {
    return <div className={style.container}>{children}</div>
}