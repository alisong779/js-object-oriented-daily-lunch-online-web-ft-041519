// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;
    store.neighborhoods.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      delivery => {return delivery.neighborhoodId === this.id}
    );
  }
  customers(){
    return store.customers.filter(
      customer => {return customer.neighborhoodId === this.id}
    );
  }
  meals(){
    return store.meals.filter(
      onlyUnique
    )
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(
      delivery => {return delivery.customerId === this.id}
    );
  }
  meals(){
    return this.deliveries().map(
        delivery => delivery.meal()
    );
  }
  totalSpent(){
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
  }
class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);
  }
  static byPrice() {
    return store.meals.sort((a, b) => (a.price < b.price ? 1 : -1));
  }
  deliveries(){
    return store.deliveries.filter(
      delivery => {return delivery.mealId === this.id}
    );
  }
  customers(){
    const allCustomers = this.deliveries().map(delivery => delivery.customer());
    return [...new Set(allCustomers)];
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find(
      meal => {return meal.id === this.mealId}
    );
  }
  customer(){
    return store.customers.find(
      customer => {return customer.id === this.customerId}
    );
  }
  neighborhood(){
    return store.neighborhoods.find(
      neighborhood => {return neighborhood.id === this.neighborhoodId}
    );
  }
}
