import React from 'react';

export default function TooltipDemo() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="group relative m-12 flex justify-center">
                <button className="btn-primary">Hover me!</button>
                <span className="absolute -top-10 scale-0 w-full transition-all rounded bg-gray-800 p-2 text-sm text-white group-hover:scale-100">✨ You hover me!</span>
            </div>
        </div>
    );
}