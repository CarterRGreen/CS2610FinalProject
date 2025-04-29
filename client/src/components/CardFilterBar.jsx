import { Input } from "./Input";

export function CardFilterBar({filters, setFilters, doSearch,}){
    function handleCheckboxChange(e, filterName) {
        setFilters(prev => ({...prev, [filterName]: e.target.checked}));
    }
    function handleColorChange(e, color){
        setFilters(prev =>{
            const newColors = [...prev.colors];
            if (e.target.checked){
                newColors.push(color);
            }
            else{
                const index = newColors.indexOf(color);
                if (index > -1){
                    newColors.splice(index, 1);
                }
            }
            return {...prev, colors: newColors};
        })
    }
    function handleInputChange(e, filterName){
        setFilters(prev => ({...prev, [filterName]: e.target.value}));
    }
    return (
        <div className="filter_container">
            <div className="filter_row">
                <Input label="Name" type="checkbox" value={filters.nameBox} onChange={(e) => handleCheckboxChange(e,"nameBox")} className="checkbox"/>
                Filter by Name
                {filters.nameBox && <input className="search_bar" type="text" value={filters.name} onChange={(e) => handleInputChange(e,"name")}/>}
            </div>
            <div className="filter_row">
                <Input label="Color" type="checkbox" value={filters.colorBox} onChange={(e) => handleCheckboxChange(e,"colorBox")} className="checkbox"/>
                Filter by Color
                {filters.colorBox? <>
                    <input type="checkbox" value={filters.red} onChange={(e) => handleColorChange(e,"Red")}/> Red
                    <input type="checkbox" value={filters.blue} onChange={(e) => handleColorChange(e,"Blue")}/> Blue
                    <input type="checkbox" value={filters.white} onChange={(e) => handleColorChange(e,"White")}/> White
                    <input type="checkbox" value={filters.black} onChange={(e) => handleColorChange(e,"Black")}/> Black
                    <input type="checkbox" value={filters.green} onChange={(e) => handleColorChange(e,"Green")}/> Green
                </> : null}
            </div>
            <div className="filter_row">
                <Input label="Power" type="checkbox" value={filters.powerBox} onChange={(e) => handleCheckboxChange(e,"powerBox")} className="checkbox"/>
                Filter by Power
                {filters.powerBox && <input type="number" value={filters.power} onChange={(e) => handleInputChange(e,"power")}/>}
            </div>
            <div className="filter_row">
                <Input label="Toughness" type="checkbox" value={filters.toughnessBox} onChange={(e) => handleCheckboxChange(e,"toughnessBox")} className="checkbox"/>
                Filter by Toughness
                {filters.toughnessBox && <input type="number" value={filters.toughness} onChange={(e) => handleInputChange(e,"toughness")}/>}
            </div>
            <div className="filter_row">
                <Input label="Set" type="checkbox" value={filters.setBox} onChange={(e) => handleCheckboxChange(e,"setBox")} className="checkbox"/>
                Filter by Set
                {filters.setBox && <input type="text" value={filters.set} onChange={(e) => handleInputChange(e,"set")}/>}
            </div>
            <div className="filter_row">
                <Input label="Type" type="checkbox" value={filters.typeBox} onChange={(e) => handleCheckboxChange(e,"typeBox")} className="checkbox"/>
                Filter by Type
                {filters.typeBox && <input type="text" value={filters.type} onChange={(e) => handleInputChange(e,"type")}/>}
            </div>
            <div className="filter_row">
                <Input label="Subtype" type="checkbox" value={filters.subtypeBox} onChange={(e) => handleCheckboxChange(e,"subtypeBox")} className="checkbox"/>
                Filter by Subtype
                {filters.subtypeBox && <input type="text" value={filters.subtype} onChange={(e) => handleInputChange(e,"subtype")}/>}
            </div>
            <button className="submit" onClick={doSearch}>Search</button>
        </div>
    )
}