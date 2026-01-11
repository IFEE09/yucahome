"use client";

export default function OpenSellerFormBtn() {
    return (
        <button
            onClick={() => window.dispatchEvent(new Event("open-seller-modal"))}
            className="hover:text-primary transition-colors cursor-pointer font-medium"
        >
            Vender Propiedad
        </button>
    );
}
