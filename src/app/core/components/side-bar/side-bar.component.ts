import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategoriesData } from '../../../features/categories/interfaces/IGetAllCategories';
import { ISubCatData } from '../../../features/categories/interfaces/IGetSubCategories';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
@Input() categories! : ICategoriesData[]
@Input() subCategories! : ISubCatData[]

@Output() subCategoryChanged = new EventEmitter<string[]>();

selectedSubCategories: string[] = [];
  
openedCategory: string | null = null;
subCategoryMap : {[key : string] : ISubCatData[]}= {};
ngOnInit(): void {
    this.filterCategory()
}
filterCategory(){
  if(this.subCategories){
    this.subCategories.forEach(sub => {
      if(!this.subCategoryMap[sub.category]){
        this.subCategoryMap[sub.category]=[]
      }
      this.subCategoryMap[sub.category].push(sub)
    })
  }
  }

toggleCategory(catId: string) {
  console.log(catId);
  console.log('opened',this.openedCategory);
  this.openedCategory = this.openedCategory === catId ? null : catId;
  console.log(this.openedCategory);
}
toggleClass(event : HTMLElement){
  const ele = event as HTMLElement;
  ele.classList.toggle('open')

}
onSubCategoryChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  if (input.checked) {
    this.selectedSubCategories.push(value);
  } else {
    this.selectedSubCategories = this.selectedSubCategories.filter(id => id !== value);
  }

  this.subCategoryChanged.emit(this.selectedSubCategories);
}
}
