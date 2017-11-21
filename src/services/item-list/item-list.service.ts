
import{Injectable} from '@angular/core'
import { AngularFireDatabase } from "angularfire2/database";
import { Item } from '../../models/item/item.model';

@Injectable()
export class ItemListService{


    private ItemListRef = this.db.list<Item>('student');
    constructor(public db: AngularFireDatabase)
    {

    }
    getstudentlist()
    {
     return this.ItemListRef;
    }
    addItem(item: Item)
    {
     return this.ItemListRef.push(item)
    }
    updateItem(item: Item)
    {
     return this.ItemListRef.update(item.key,item)
    }
    removeItem(item: Item)
    {
     return this.ItemListRef.remove(item.key);
    }

}