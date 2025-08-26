import { Category } from "../models/Category";

export const categoryMap: Record<string, Category> = {
  // Produce
  apples: Category.PRODUCE,
  bananas: Category.PRODUCE,
  oranges: Category.PRODUCE,
  grapes: Category.PRODUCE,
  strawberries: Category.PRODUCE,
  blueberries: Category.PRODUCE,
  lettuce: Category.PRODUCE,
  tomatoes: Category.PRODUCE,
  onions: Category.PRODUCE,
  potatoes: Category.PRODUCE,
  carrots: Category.PRODUCE,
  broccoli: Category.PRODUCE,
  spinach: Category.PRODUCE,
  avocado: Category.PRODUCE,
  "bell peppers": Category.PRODUCE,

  // Dairy & Eggs
  milk: Category.DAIRY_EGGS,
  eggs: Category.DAIRY_EGGS,
  cheese: Category.DAIRY_EGGS,
  yogurt: Category.DAIRY_EGGS,
  butter: Category.DAIRY_EGGS,

  // Meat
  "chicken breast": Category.MEAT,
  "ground beef": Category.MEAT,
  bacon: Category.MEAT,
  sausage: Category.MEAT,
  "pork chops": Category.MEAT,

  // Prepared Foods
  "rotisserie chicken": Category.PREPARED_FOODS,
  sushi: Category.PREPARED_FOODS,
  sandwiches: Category.PREPARED_FOODS,
  "salad kits": Category.PREPARED_FOODS,
  soup: Category.PREPARED_FOODS,

  // Pantry Essentials
  "olive oil": Category.PANTRY_ESSENTIALS,
  "vegetable oil": Category.PANTRY_ESSENTIALS,
  flour: Category.PANTRY_ESSENTIALS,
  sugar: Category.PANTRY_ESSENTIALS,
  salt: Category.PANTRY_ESSENTIALS,
  "black pepper": Category.PANTRY_ESSENTIALS,
  pasta: Category.PANTRY_ESSENTIALS,
  rice: Category.PANTRY_ESSENTIALS,
  "canned tomatoes": Category.PANTRY_ESSENTIALS,
  "canned beans": Category.PANTRY_ESSENTIALS,
  "peanut butter": Category.PANTRY_ESSENTIALS,
  jelly: Category.PANTRY_ESSENTIALS,
  honey: Category.PANTRY_ESSENTIALS,
  cereal: Category.PANTRY_ESSENTIALS,
  oatmeal: Category.PANTRY_ESSENTIALS,

  // Breads, Rolls & Bakery
  bread: Category.BREADS_ROLLS_BAKERY,
  bagels: Category.BREADS_ROLLS_BAKERY,
  croissants: Category.BREADS_ROLLS_BAKERY,
  muffins: Category.BREADS_ROLLS_BAKERY,
  donuts: Category.BREADS_ROLLS_BAKERY,

  // Desserts
  "ice cream": Category.DESSERTS,
  cookies: Category.DESSERTS,
  cake: Category.DESSERTS,
  pie: Category.DESSERTS,
  chocolate: Category.DESSERTS,

  // Body Care
  shampoo: Category.BODY_CARE,
  conditioner: Category.BODY_CARE,
  "body wash": Category.BODY_CARE,
  soap: Category.BODY_CARE,
  lotion: Category.BODY_CARE,
  deodorant: Category.BODY_CARE,
  toothpaste: Category.BODY_CARE,
  toothbrush: Category.BODY_CARE,

  // Supplements
  vitamins: Category.SUPPLEMENTS,
  "protein powder": Category.SUPPLEMENTS,

  // Frozen Foods
  "frozen pizza": Category.FROZEN_FOODS,
  "frozen vegetables": Category.FROZEN_FOODS,
  "frozen fruits": Category.FROZEN_FOODS,
  "frozen dinners": Category.FROZEN_FOODS,
  waffles: Category.FROZEN_FOODS,

  // Snacks, Chips, Salsas & Dips
  "potato chips": Category.SNACKS_CHIPS_SALSAS_DIPS,
  "tortilla chips": Category.SNACKS_CHIPS_SALSAS_DIPS,
  salsa: Category.SNACKS_CHIPS_SALSAS_DIPS,
  guacamole: Category.SNACKS_CHIPS_SALSAS_DIPS,
  hummus: Category.SNACKS_CHIPS_SALSAS_DIPS,
  pretzels: Category.SNACKS_CHIPS_SALSAS_DIPS,
  popcorn: Category.SNACKS_CHIPS_SALSAS_DIPS,
  crackers: Category.SNACKS_CHIPS_SALSAS_DIPS,
  nuts: Category.SNACKS_CHIPS_SALSAS_DIPS,
  "granola bars": Category.SNACKS_CHIPS_SALSAS_DIPS,

  // Seafood
  salmon: Category.SEAFOOD,
  shrimp: Category.SEAFOOD,
  tuna: Category.SEAFOOD,
  tilapia: Category.SEAFOOD,
  cod: Category.SEAFOOD,

  // Beverages
  water: Category.BEVERAGES,
  soda: Category.BEVERAGES,
  juice: Category.BEVERAGES,
  coffee: Category.BEVERAGES,
  tea: Category.BEVERAGES,
  "sports drinks": Category.BEVERAGES,

  // Wine, Beer & Spirits
  "red wine": Category.WINE_BEER_SPIRITS,
  "white wine": Category.WINE_BEER_SPIRITS,
  beer: Category.WINE_BEER_SPIRITS,
  vodka: Category.WINE_BEER_SPIRITS,
  whiskey: Category.WINE_BEER_SPIRITS,

  // Beauty
  makeup: Category.BEAUTY,
  skincare: Category.BEAUTY,
  "hair care": Category.BEAUTY,

  // Floral
  flowers: Category.FLORAL,
  plants: Category.FLORAL,

  // Household
  "paper towels": Category.HOUSEHOLD,
  "toilet paper": Category.HOUSEHOLD,
  "trash bags": Category.HOUSEHOLD,
  "laundry detergent": Category.HOUSEHOLD,
  "dish soap": Category.HOUSEHOLD,
  "all-purpose cleaner": Category.HOUSEHOLD,
  sponges: Category.HOUSEHOLD,

  // Baby & Child
  diapers: Category.BABY_CHILD,
  "baby wipes": Category.BABY_CHILD,
  "baby food": Category.BABY_CHILD,
  formula: Category.BABY_CHILD,

  // Lifestyle
  books: Category.LIFESTYLE,
  magazines: Category.LIFESTYLE,
  "greeting cards": Category.LIFESTYLE,

  // Pet
  "dog food": Category.PET,
  "cat food": Category.PET,
  "cat litter": Category.PET,
  "pet toys": Category.PET,
};
