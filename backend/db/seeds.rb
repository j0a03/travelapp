Travel.create(
    nome: Faker::Travel::Airport.name(size: 'large', region: 'united_states'),
    data: Faker::Date.forward,
    price: Faker::Number.decimal,
    desc: Faker::Restaurant.description
)

puts Travel.last