export class Elf {
  foodItems: number[] = [];

  addFoodItem(calories: number) {
    this.foodItems.push(calories);
  }

  getTotalCalories() {
    return this.foodItems.reduce((prev, next) => {
      return prev + next;
    })
  }
}
