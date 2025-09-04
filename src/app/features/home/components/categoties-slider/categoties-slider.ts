import { afterEveryRender, afterNextRender, AfterViewChecked, AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CategoriesServices } from '../../../categories/services/categories';
import { ICategoriesData, IGetAllCategoris } from '../../../categories/interfaces/IGetAllCategories';
import { LoadingSpinner } from "../../../../shared/components/loading-spinner/loading-spinner";
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categoties-slider',
  imports: [CarouselModule, LoadingSpinner],
  templateUrl: './categoties-slider.html',
  styleUrl: './categoties-slider.css'
})
export class CategotiesSlider implements OnInit {
  @ViewChild("owlSlider", { static: false })
  owlSlider! :CarouselComponent
  //Inject services
  private readonly categoriesServices = inject(CategoriesServices)
  //Variables
  private destroy$ = new Subject<void>()
  allCategories!: ICategoriesData[]

  ngOnInit(): void {
    this.getAllCategories()
  }
  // ngAfterViewInit(): void {
  //         interval(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
  //     if(this.owlSlider) {
  //       this.owlSlider.next()
  //       console.log('next');
  //     }
  //   })
  // }

  getAllCategories() {
    this.categoriesServices.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: IGetAllCategoris) => {
        this.allCategories = response.data
      }
    })
  }
  onCarouselInitialized(event : SlidesOutputData){
    console.log('onCarouselInitialized');
    interval(2000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      if(this.owlSlider) {
        this.owlSlider.next()
        console.log('next');
      }
    })
}



  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: false,
    autoplayTimeout: 0,
    autoplaySpeed: 0,
    slideTransition: "linear",
    smartSpeed: 2000,   // ساعات بتحتاج تضيفها للـ owl
    navSpeed: 2000,
    navText: ['', ''],
    items: 7,
    nav: true
  }
    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('destroy');
  }
}
