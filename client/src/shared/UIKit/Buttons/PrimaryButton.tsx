import styles from './buttons.module.scss'
type PButtonProps = {
    content: string
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

const PrimaryButton = ({ content, onClick }: PButtonProps) => {
    return (
        <button className={styles.pButton} onClick={onClick}>
            {content}
        </button>
    )
}

export default PrimaryButton