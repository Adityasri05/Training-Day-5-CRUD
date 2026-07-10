import Card from "../components/molecule/card"
import CardData from "../sampleData/cardData"

const WoodsPage=()=>{
    return(
        <div className="woods-page">
            <div className="cardsClass">
                {CardData.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
export default WoodsPage