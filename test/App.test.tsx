/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {describe,test,expect} from 'vitest'
import {render,screen} from '@testing-library/react'
import App from '../src/App'
import userEvent from '@testing-library/user-event'

describe('<App/>',()=>{
   /* test('should work',()=>{
        render(<App/>)
        screen.debug()
        expect(
        screen.getByText('Añadir item'))
        .toBeDefined()
    })
*/
test('should add items and remove them',async()=>{
    const user=userEvent.setup()
    render(<App/>)
    //buscamos el input
    const input=screen.getByRole('textbox')
    expect(input).toBeDefined()
    //buscamos el boton primero el formulario
    const form =screen.getByRole('form')
    expect(form).toBeDefined()
    //boton
    const button=form.querySelector('button')
    expect(button).toBeDefined()
    //ingresamos un texto
    const random=crypto.randomUUID()
    await user.type(input,random)
    //presionamos el boton
    await user.click(button!)
    //verificamos que se haya agregado
    const list=screen.getByRole('list')
    expect(list).toBeDefined()
    //verificamos que se haya agregado el item
    expect(list.childNodes.length).toBe(1)

    //buscamos 
    const item=screen.getByText(random)
    expect(item).toBeDefined()
    //buscamos el boton de eliminar
    const deleteButton=item.querySelector('button')
    expect(deleteButton).toBeDefined()
    //eliminamos el item
    await user.click(deleteButton!)
   //verificamos que se haya eliminado
   const noRes=screen.queryByText("No hay elementos en la lista.")
    expect(noRes).toBeDefined()

})
 /*
    para los test debi instakr vitest y happy-dom
    npm install vitest happy-dom -D 
    para react use react testing library 
    npm install --save-dev @testing-library/react
    si solo puedo hacer un test cual haria ?
    seria el end to end el cual se hace de la siguinet forma 
    testing library user event 
    npm install -D  @testing-library/user-event @testing-library/dom
    */
})


