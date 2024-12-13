import React from 'react'
import "./result.css"

function ResultPage({ res }) {

    function renderPage() {
        switch (res) {
            case 1:
                return <h1 className='res'>You Won</h1>
            case -1:
                return <h1 className='res'>You Lost</h1>
            default:
                return <h1 className='res'>You Draw</h1>
        }
    }

    return (
        <div className='resultPage'>
            {renderPage()}
            <button>Retry</button>
        </div>
    )
}

export default ResultPage