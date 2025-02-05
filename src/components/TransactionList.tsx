import { formatDistanceToNow } from "date-fns"

interface Token {
    symbol: string
    amount: string
    value: string
    icon: string
}

export interface Transaction {
    id: string
    timestamp: Date
    hash: string
    type: string
    tokens: Token[]
    gasFee: {
        amount: string
        value: string
    }
}

interface TransactionListProps {
    transactions: Transaction[]
}

export default function TransactionList({ transactions }: TransactionListProps) {
    return (
        <div className="flex flex-col space-y-4">
            {transactions.map((tx) => (
                <div
                    key={tx.id}
                    className="flex flex-col space-y-2 p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-500">{formatDistanceToNow(tx.timestamp)} ago</div>
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-mono text-gray-600">
                                    {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                                </div>
                                <button
                                    onClick={() => navigator.clipboard.writeText(tx.hash)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Gas Fee {tx.gasFee.amount} (~${tx.gasFee.value})
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">{tx.type}</span>
                        </div>

                        <div className="flex flex-col space-y-1">
                            {tx.tokens.map((token, index) => (
                                <div key={index} className="flex items-center justify-end space-x-2">
                                    <img src={token.icon || "/placeholder.svg"} alt={token.symbol} className="w-5 h-5 rounded-full" />
                                    <span className="text-sm text-emerald-600">
                                        +{token.amount} {token.symbol} (${token.value})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

