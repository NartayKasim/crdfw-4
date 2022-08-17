import classes from "./Display.module.css";
import { DisplayProps } from "../inventoryTypes";
import Loading from "../../../common/loading/Loading";
import NoResults from "../../../common/no-results/NoResults";
import Card from "../card/Card";

export default function Display({ page, isLoading }: DisplayProps) {
   return (
      <div className={classes.display}>
         {!page.length && <NoResults />}
         {isLoading && <Loading />}
         {page.length > 0 &&
            !isLoading &&
            page.map((item) => {
               return <Card key={item.id} itemObj={item} />;
            })}
      </div>
   );
}
