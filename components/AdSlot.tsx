interface Props {
    id: string;
    label?: string;
}

export default function AdSlot({ id, label }: Props) {
    return (
        <div className="ad-slot" aria-label={label ?? "Advertisement"} data-ad-slot={id}>
            {/* Drop Google AdSense code here */}
            <p className="ad-slot-placeholder">Ad</p>
        </div>
    );
}
