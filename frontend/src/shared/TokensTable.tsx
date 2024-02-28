import { DepositedToken } from "@/constants/types/token";
import { formatEther } from "ethers/lib/utils"

export default function TokensTable({
  tokens
}: {
    tokens: DepositedToken[]
}) {

  return (
    <div className="overflow-x-auto">
      <table className="table text-info">
        <thead>
          <tr className="text-info">
            <th>Token</th>
            <th>Amount</th>
            <th>EL Points</th>
            <th>Protocol Points</th>
          </tr>
        </thead>
        <tbody>
          {
            tokens.map((token, index) => {
              const {
                symbol: name,
                balance: amount,
                elPoints,
                protocolPoints
              } = token;
              return (
                <tr key={index}>
                  <th>{name}</th>
                  <td>{formatEther(amount)}</td>
                  <td>{elPoints}</td>
                  <td>{protocolPoints}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}