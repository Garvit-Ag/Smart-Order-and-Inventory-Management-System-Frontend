import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { PopupService } from '../../services/popup';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private popup = inject(PopupService);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe(data => this.products.set(data));
  }

  addToCart(product: Product) {
    if (product.stock > 0) {
      this.cartService.addToCart(product);
      this.popup.show(`${product.name} added to cart!`, 'success');
    } else {
      this.popup.show("Sorry, this item is out of stock.", "error");
    }
  }
}