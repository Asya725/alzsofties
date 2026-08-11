// 1. Import your local images at the top
import zan1Img from "../assets/ZAN1.jpg";
import zan2Img from "../assets/Zan02.jpg";
import zan3Img from "../assets/Zan003.jpg";
import zan4Img from "../assets/Zan004.jpg";

export const PRODUCTS = [
  {
    id: 1,
    name: "Wool Overcoat",
    category: "Men",
    price: 189,
    originalPrice: 236,
    discount: 20,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    tags: ["Winter", "Outerwear", "Formal", "Heavyweight"],
    blurb: "Heavyweight tailored wool, cut long for cold commutes.",
    img: zan1Img,
    images: [zan1Img, zan2Img, zan3Img, zan4Img],
    colors: [
      {
        name: "Charcoal",
        img: zan1Img,
      },
      {
        name: "Navy",
        img: "https://placehold.co/600x750/000080/FFFFFF?text=Navy",
      },
    ],
  },
  {
    id: 2,
    name: "Silk Slip Dress",
    category: "Women",
    price: 64,
    originalPrice: 128,
    discount: 50,
    inStock: true,
    sizes: ["XS", "S", "M"],
    tags: ["Summer", "Elegant", "Evening", "Lightweight"],
    blurb: "Bias-cut silk that moves with you, not against you.",
    img: "https://placehold.co/600x750/AD1330/F3D9DC?text=Slip+Dress",
    images: [
      "https://placehold.co/600x750/AD1330/F3D9DC?text=Slip+Dress",
      "https://placehold.co/600x750/AD1330/F3D9DC?text=Angle+2",
      "https://placehold.co/600x750/AD1330/F3D9DC?text=Angle+3",
    ],
    colors: [
      {
        name: "Crimson",
        img: "https://placehold.co/600x750/AD1330/F3D9DC?text=Crimson",
      },
      {
        name: "Black",
        img: "https://placehold.co/600x750/111111/FFFFFF?text=Black",
      },
    ],
  },
  {
    id: 3,
    name: "Canvas Court Sneaker",
    category: "Shoes",
    price: 78,
    originalPrice: 78,
    discount: 0,
    inStock: false,
    sizes: ["39", "40", "41", "42", "43"],
    tags: ["Casual", "Everyday", "Streetwear", "Spring"],
    blurb: "A low-profile classic in brushed cotton canvas.",
    img: "https://placehold.co/600x750/D8D3C9/211E19?text=Sneaker",
    images: [
      "https://placehold.co/600x750/D8D3C9/211E19?text=Sneaker",
      "https://placehold.co/600x750/D8D3C9/211E19?text=Top+View",
      "https://placehold.co/600x750/D8D3C9/211E19?text=Sole+View",
    ],
    colors: [
      {
        name: "Off-White",
        img: "https://placehold.co/600x750/D8D3C9/211E19?text=Off-White",
      },
    ],
  },
  {
    id: 4,
    name: "Ribbed Knit Vest",
    category: "Women",
    price: 52,
    originalPrice: 65,
    discount: 20,
    inStock: true,
    sizes: ["S", "M", "L"],
    tags: ["Layering", "Fall", "Knitwear", "Casual"],
    blurb: "Layer piece in soft merino rib, cropped at the hip.",
    img: "https://placehold.co/600x750/4B5A3C/E2E7D6?text=Knit+Vest",
    images: [
      "https://placehold.co/600x750/4B5A3C/E2E7D6?text=Knit+Vest",
      "https://placehold.co/600x750/4B5A3C/E2E7D6?text=Detail",
    ],
    colors: [
      {
        name: "Olive",
        img: "https://placehold.co/600x750/4B5A3C/E2E7D6?text=Olive",
      },
      {
        name: "Cream",
        img: "https://placehold.co/600x750/F5F5DC/111111?text=Cream",
      },
    ],
  },
  {
    id: 5,
    name: "Oxford Weave Shirt",
    category: "Men",
    price: 59,
    originalPrice: 59,
    discount: 0,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    tags: ["Smart Casual", "Office", "Essentials", "Breathable"],
    blurb: "Breathable oxford cotton, made for a stiff top button.",
    img: "https://placehold.co/600x750/E8E2D4/211E19?text=Oxford+Shirt",
    images: [
      "https://placehold.co/600x750/E8E2D4/211E19?text=Oxford+Shirt",
      "https://placehold.co/600x750/E8E2D4/211E19?text=Collar",
      "https://placehold.co/600x750/E8E2D4/211E19?text=Cuff",
    ],
    colors: [
      {
        name: "Stone",
        img: "https://placehold.co/600x750/E8E2D4/211E19?text=Stone",
      },
      {
        name: "Light Blue",
        img: "https://placehold.co/600x750/ADD8E6/111111?text=Light+Blue",
      },
    ],
  },
  {
    id: 6,
    name: "Leather Chelsea Boot",
    category: "Shoes",
    price: 112,
    originalPrice: 140,
    discount: 20,
    inStock: true,
    sizes: ["40", "41", "42", "43", "44"],
    tags: ["Formal", "Winter", "Leather", "Classic"],
    blurb: "Full-grain leather with an elastic gusset side panel.",
    img: "https://placehold.co/600x750/3A2E24/E8E2D4?text=Chelsea+Boot",
    images: [
      "https://placehold.co/600x750/3A2E24/E8E2D4?text=Chelsea+Boot",
      "https://placehold.co/600x750/3A2E24/E8E2D4?text=Side",
    ],
    colors: [
      {
        name: "Brown",
        img: "https://placehold.co/600x750/3A2E24/E8E2D4?text=Brown",
      },
      {
        name: "Black",
        img: "https://placehold.co/600x750/111111/FFFFFF?text=Black",
      },
    ],
  },
  {
    id: 7,
    name: "Woven Belt",
    category: "Accessories",
    price: 19,
    originalPrice: 38,
    discount: 50,
    inStock: true,
    sizes: ["One Size"],
    tags: ["Leather", "Everyday", "Essentials", "Gifts"],
    blurb: "Braided leather, solid brass buckle, ages beautifully.",
    img: "https://placehold.co/600x750/A9812E/211E19?text=Belt",
    images: [
      "https://placehold.co/600x750/A9812E/211E19?text=Belt",
      "https://placehold.co/600x750/A9812E/211E19?text=Buckle",
    ],
    colors: [
      {
        name: "Tan",
        img: "https://placehold.co/600x750/A9812E/211E19?text=Tan",
      },
    ],
  },
  {
    id: 8,
    name: "Wide-Leg Trouser",
    category: "Women",
    price: 74,
    originalPrice: 74,
    discount: 0,
    inStock: true,
    sizes: ["XS", "S", "M", "L"],
    tags: ["Office", "Elegant", "Comfort", "Spring"],
    blurb: "High-rise trouser with a fluid drape, fully lined.",
    img: "https://placehold.co/600x750/79746A/F2EFE8?text=Trouser",
    images: [
      "https://placehold.co/600x750/79746A/F2EFE8?text=Trouser",
      "https://placehold.co/600x750/79746A/F2EFE8?text=Back",
    ],
    colors: [
      {
        name: "Taupe",
        img: "https://placehold.co/600x750/79746A/F2EFE8?text=Taupe",
      },
      {
        name: "Black",
        img: "https://placehold.co/600x750/111111/FFFFFF?text=Black",
      },
    ],
  },
  {
    id: 9,
    name: "Cotton Tote Bag",
    category: "Accessories",
    price: 22,
    originalPrice: 22,
    discount: 0,
    inStock: false,
    sizes: ["One Size"],
    tags: ["Casual", "Travel", "Essentials", "Canvas"],
    blurb: "Heavy canvas tote, reinforced straps, holds its shape.",
    img: "https://placehold.co/600x750/211E19/E8E2D4?text=Tote",
    images: [
      "https://placehold.co/600x750/211E19/E8E2D4?text=Tote",
      "https://placehold.co/600x750/211E19/E8E2D4?text=Inside",
    ],
    colors: [
      {
        name: "Black",
        img: "https://placehold.co/600x750/211E19/E8E2D4?text=Black",
      },
    ],
  },
  {
    id: 10,
    name: "Merino Crewneck",
    category: "Men",
    price: 68,
    originalPrice: 85,
    discount: 20,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    tags: ["Knitwear", "Fall", "Winter", "Layering"],
    blurb: "Fine-gauge merino, breathable enough for layering.",
    img: "https://placehold.co/600x750/5C6B4C/E2E7D6?text=Crewneck",
    images: [
      "https://placehold.co/600x750/5C6B4C/E2E7D6?text=Crewneck",
      "https://placehold.co/600x750/5C6B4C/E2E7D6?text=Detail",
    ],
    colors: [
      {
        name: "Forest",
        img: "https://placehold.co/600x750/5C6B4C/E2E7D6?text=Forest",
      },
      {
        name: "Grey",
        img: "https://placehold.co/600x750/808080/FFFFFF?text=Grey",
      },
    ],
  },
  {
    id: 11,
    name: "Pleated Midi Skirt",
    category: "Women",
    price: 45,
    originalPrice: 90,
    discount: 50,
    inStock: true,
    sizes: ["XS", "S", "M"],
    tags: ["Elegant", "Spring", "Summer", "Lightweight"],
    blurb: "Sunray pleats in a fluid recycled-poly blend.",
    img: "https://placehold.co/600x750/8A2A3B/F3D9DC?text=Midi+Skirt",
    images: [
      "https://placehold.co/600x750/8A2A3B/F3D9DC?text=Midi+Skirt",
      "https://placehold.co/600x750/8A2A3B/F3D9DC?text=Texture",
    ],
    colors: [
      {
        name: "Maroon",
        img: "https://placehold.co/600x750/8A2A3B/F3D9DC?text=Maroon",
      },
    ],
  },
  {
    id: 12,
    name: "Suede Loafer",
    category: "Shoes",
    price: 96,
    originalPrice: 96,
    discount: 0,
    inStock: true,
    sizes: ["39", "40", "41", "42"],
    tags: ["Smart Casual", "Office", "Leather", "Slip-on"],
    blurb: "Unlined suede loafer with a stacked leather heel.",
    img: "https://placehold.co/600x750/6B4F3A/E8E2D4?text=Loafer",
    images: [
      "https://placehold.co/600x750/6B4F3A/E8E2D4?text=Loafer",
      "https://placehold.co/600x750/6B4F3A/E8E2D4?text=Top",
    ],
    colors: [
      {
        name: "Sand",
        img: "https://placehold.co/600x750/6B4F3A/E8E2D4?text=Sand",
      },
    ],
  },
];

export const CATEGORIES = ["All", "Men", "Women", "Shoes", "Accessories"];
