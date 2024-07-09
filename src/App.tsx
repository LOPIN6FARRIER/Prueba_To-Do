import './App.css'
import { Item } from './components/Item'
import { useItems } from './Hooks/useitems'
import { useSEO } from './Hooks/useSEO'



export type ItemId = `${string}-${string}-${string}-${string}-${string}`
export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { items, addItem, removeItem } = useItems()
  useSEO(
    {
      title: `[${items.length}]Prueba técnica de React`,
      description: 'Añadir y eliminar elementos de una lista',	 
    }
  )
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // e.target.value -> para escuchar el onChange de un INPUT

    const { elements } = event.currentTarget

    // estrategia 1, trampa de TypeScript
    // no os lo recomiendo:
    // const input = elements.namedItem('item') as HTMLInputElement

    // estrategia 2, es asegurarse que realmente es lo que es
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement // JavaScript puro
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>Prueba técnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>

        <form onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
          <label>
            Elemento a introducir:
            <input
              name="item"
              required
              type="text"
              placeholder="añadir item"
            />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
          {
            items.length === 0 ? (
              <p>
                <strong>No hay elementos en la lista.</strong>
              </p>
            ) : (
              <ul>
                {
                  items.map((item) => {
                    return (
                      <Item
                        {...item}
                        handleDelete={createHandleRemoveItem(item.id)} // Change handleClick to handleDelete
                        key={item.id} />
                    )
                  })
                }
              </ul>
            )
          }
      </section>
    </main>
  )
}

export default App