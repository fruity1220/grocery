import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
//이걸 제일 마지막에 작성했음
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
//list가존재한다면
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }//parse하는 이유는 string이기때문에
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList( 
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }//id는 그대로 title만 current statevalue(setName)로 change
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);//..list = get all the list from state list value
     //list 다 가져오고 그 다음에 newItem add
      setName('');//empty string으로 하는 이유가 빈칸에 name을 쳐서 입력하면 그 후에는 그 이름이 
      //없어져야 보기 좋으니까
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };//handlesubmit부분에서 좀 더 간단하게 사용할 수 있게 만든 function
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));//item.id가 removeItem에 넣은 id와 같지 않다면 return해달라
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);//editing하면 어떤 item을editing하는지알려주고 싶으니 title넘겨주기
  };
  //setItem을 call하고 싶다 list가 change할 때마다
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));//string으롼 store할 수 있어서 stringify해줘야한다
  }, [list]);
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      //conditionl rendering
      {list.length > 0 /*length가 0보다 클때 grocery container를 보여라*/&& (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
