export default function Button({ label, onClick }) {
    return (
        <button className="btn btn-blue" onClick={onClick}>
            {label}
        </button>
    );
}