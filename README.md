A pure React based Typeahead component without any third-party dependencies like Bootstrap, Jquery.

---
## Props

The component takes the following props.

| Prop              | Type       | Default | Description |
|-------------------|------------|---------|-------------|
| autoFocus		    | _boolean_  | `fasle`   | Focus input element. |
| attachToBody      | _boolean_  | `false`   | Append option popup to body. |
| disabled		    | _boolean_  |   `false` | Disable input element. |
| labelKey		    | _string_   |    | If options prop is array of objects, then you can customize what to be displayed as a display name through label key property.|
| onHide		    | _function_  |    | Callback function will be called on hiding/closing dropdown overlay. |
| onSelected		| _function_  |    | Callback function will be called when user selects value from dropdown.|
| onOpen		    | _function_  |    | Callback function will be called dropdown overlay opens. |
| options           | _array_     | | Dropdown options.|
| placeholder		| _string_   |  `Search..`  | Input placeholder value.|
| renderItem		| _function_   |    | Highlt customize dropdown options through renderItem function. The function passes `option` and `props' as parameter and it let render own react object. This will be used to customize options with icons.|
| selectedValue		| _string_ or _array_   |   | Pass default dropdown value.|
| noResultsMessage	| _string_ |`No results found.` |Customize no results message. |

---

## Examples

See below examples to get actual usuage of props.

#### Focus State
```jsx render preview
<Typeahead autoFocus />
```

#### Disabled State
```jsx render preview
<Typeahead disabled/>
```
#### Pass custom placeholder
```jsx render preview
<Typeahead placeholder="Find"/>
```
#### Pass custom no results message
```jsx render preview
<Typeahead options={[]} noResultsMessage="Oops, no results!" />
```

#### Pass selection value by default
```jsx render preview
<Typeahead 
    options={[{
        label: 'Afghanistan',
        id: 0
    },{
        label: 'Albania',
        id: 1
    },{
        label: 'Algeria',
        id: 2
    },{
        label: 'Andorra',
        id: 3
    }]}
    labelKey="label"
    selectedValue={{ label: 'Afghanistan', id: 0}}
/>
```
#### Customize item renderer
```jsx render preview
<Typeahead 
    options={[{
        label: 'Afghanistan',
        id: 0
    },{
        label: 'Albania',
        id: 1
    },{
        label: 'Algeria',
        id: 2
    },{
        label: 'Andorra',
        id: 3
    }]}
    labelKey="label"
    renderItem={(option) => (<div>Prefix: {option.label}</div>)}
/>
```
#### Events
```jsx render preview
<Typeahead 
    labelKey="label"
    onOpen={(e, selectedItem) => {
        this.setState({
            message: "Menu opened"
        })
    }}
    onHide={(e, selectedItem) => {
        this.setState({
            message: "Menu closed"
        })
    }}
    onSelected={(e, selectedItem) => {
        this.setState({
            message: `Option selected: ${selectedItem}`
        })
    }}
    options={[{
        label: 'Afghanistan',
        id: 0
    },{
        label: 'Albania',
        id: 1
    },{
        label: 'Algeria',
        id: 2
    },{
        label: 'Andorra',
        id: 3
    }
    ]}
/>
```
#### Attach option popup to body
Note, use this prop only if you want to customize positioning popover
```jsx render preview
  <Typeahead attachToBody />
```
---
<!--
## Installation

```bash
npm install react-type-ahead --save
yarn add react-type-ahead
```
---
-->

## License

MIT
