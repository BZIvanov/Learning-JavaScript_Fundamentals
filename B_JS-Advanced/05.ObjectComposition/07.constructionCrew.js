function constructionCrew(obj) {
  if (obj.handsShaking) {
    const alcoholNeeded = obj.weight * 0.1 * obj.experience;
    obj.bloodAlcoholLevel += alcoholNeeded;
    obj.handsShaking = false;
  }

  return obj;
}

console.log(
  constructionCrew({
    weight: 80,
    experience: 1,
    bloodAlcoholLevel: 0,
    handsShaking: true,
  })
);
