import { Component } from 'react'
import Loading from '../../shared/components/Loading/Loading'

class PetsPage extends Component {
  state = {
    pets: [],
    isLoading: true,
    error: null,
    selectedCategory: ''
  };

  componentDidMount() {
    // Simulasi mengambil data dari API
    setTimeout(() => {
      this.setState({
        pets: [
          { id: 1, name: "Max", category: "Dog", description: "Max is a friendly and energetic Labrador Retriever, perfect for families with children.", image: "https://plus.unsplash.com/premium_photo-1686090449483-89a9b794e7cf?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { id: 2, name: "Whiskers", category: "Cat", description: "Whiskers is a calm and affectionate Persian cat, loves to be pampered and brushed.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { id: 3, name: "Bubbles", category: "Fish", description: "Bubbles is a vibrant goldfish that brightens up any room. Easy to care for and great for beginners.", image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=2806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { id: 4, name: "Pecky", category: "Bird", description: "Pecky is a chirpy parakeet who loves to sing and interact with people. Perfect for bird enthusiasts.", image: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?q=80&w=2403&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { id: 5, name: "Hoppy", category: "Rabbit", description: "Hoppy is a playful and cute bunny with a love for cuddles and carrots.", image: "https://images.unsplash.com/photo-1591382386627-349b692688ff?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        ],
        isLoading: false
      })
    }, 1500)
  }

  handleCategoryChange = (event) => {
    this.setState({ selectedCategory: event.target.value })
  };

  render() {
    const { pets, isLoading, error, selectedCategory } = this.state
    const filteredPets = selectedCategory === '' ? pets : pets.filter(pet => pet.category === selectedCategory)

    return (
      <div className="container">
        <h1>Available Pets for Adoption</h1>
        <div>
          <label htmlFor="category-select">Choose a category:</label>
          <select id="category-select" onChange={this.handleCategoryChange} value={selectedCategory}>
            <option value="">All</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Birds</option>
            <option value="Rabbit">Rabbits</option>
          </select>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul>
            {filteredPets.map(pet => (
              <li key={pet.id}>
                <h3>{pet.name}</h3>
                <p>{pet.category} - {pet.description}</p>
                <img src={pet.image} alt={`Image of ${pet.name}`} style={{ width: "200px", height: "200px" }} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default PetsPage
