function main() {
    const switchBackgroundMod = document.querySelector('.switcher')
        , addTodo = document.querySelector('.addTodo')
        , nameTodo = document.querySelector('.nameTodo')
        , TodosContaner = document.querySelector('.TodosContentContaner')

        , pcsOfTodos = document.querySelector('.pcsOfTodos')
        , pcsOfComplatedTodos = document.querySelector('.pcsOfComplatedTodos')

        , onlyPc = document.querySelector('.onlyPc')

        , allItem = document.querySelector('.allItem')
        , checkedItem = document.querySelector('.checkedItem')
        , ubCheckedItem = document.querySelector('.ubCheckedItem')

        , clearCheckedItems = document.querySelector('.trash')


    let checkedBtn = false
        , uncheckedBtn = false
        , checkedItemsIndex = []

    function makeTodoElelemnt(todoArray) {
        if (!todoArray)
            return null;

        todoArray.forEach(todoObj => {
            htmlTags(todoObj.item);
        });
        const check = document.querySelectorAll('.checkBox i')
        let todos = JSON.parse(localStorage.getItem('todos'))
        for (let index = 0; index < todos.length; index++) {
            if (todos[index].isComplate === true) {
                check[index].classList.add('fa-check')
                if (check[index].classList.contains('fa-check')) {
                    candation = true
                    check[index].parentElement.parentElement.classList.add('checked')
                };
            };
        }

    };

    function htmlTags(todoName) {
        const li = document.createElement('li')
            , remvoebtn = document.createElement('button')
            , iremove = document.createElement('i')
            , checkBoxBtn = document.createElement('button')
            , icheckBox = document.createElement('i')
            , pContent = document.createElement('p');


        li.classList.add('item');
        li.setAttribute('draggable', 'true');

        remvoebtn.classList.add('remvoeTodo');
        iremove.classList.add('fa');
        iremove.classList.add('fa-remove');

        checkBoxBtn.classList.add('checkBox');
        icheckBox.classList.add('fa');
        pContent.classList.add('todoContent');

        li.appendChild(remvoebtn);
        remvoebtn.appendChild(iremove);

        li.appendChild(checkBoxBtn);
        checkBoxBtn.appendChild(icheckBox);

        li.appendChild(pContent);

        TodosContaner.appendChild(li);

        pContent.textContent = todoName;

        li.addEventListener('dragstart', () => {
            li.classList.add('drangging');
        });
        li.addEventListener('dragend', () => {
            li.classList.remove('drangging');
        });
        li.classList.add('allItem')
        remvoebtn.addEventListener('click', () => {
            let todos = JSON.parse(localStorage.getItem('todos'))
            const parent = remvoebtn.parentElement
            const indexCheckElement = [...document.querySelectorAll('.item')].indexOf(parent, 0)
            todos.splice(indexCheckElement, 1)
            parent.style.animation = 'uls 0.4s ease-in'
            setTimeout(() => {
                parent.remove()
            }, 250)
            localStorage.setItem('todos', JSON.stringify(todos))
            pcses()
        });
        if (checkedBtn && !checkBoxBtn.children[0].classList.contains('fa-check')) {
            li.classList.remove('allItem')
            li.classList.remove('filterChecked')
            li.classList.remove('checked')
        }
        checkBoxBtn.addEventListener('click', () => {
            let todos = JSON.parse(localStorage.getItem('todos'))
            const parent = checkBoxBtn.parentElement
            const indexCheckElement = [...document.querySelectorAll('.item')].indexOf(parent, 0)
            let candation;
            checkBoxBtn.children[0].classList.toggle('fa-check')
            if (checkBoxBtn.children[0].classList.contains('fa-check')) {
                candation = true
                li.classList.add('checked')
            } else {
                candation = false
                li.classList.remove('checked')
            };
            if (uncheckedBtn) {
                li.classList.remove('allItem')
                li.classList.remove('filterUnchecked')
            } if (checkedBtn && !checkBoxBtn.children[0].classList.contains('fa-check')) {
                li.classList.remove('allItem')
                li.classList.remove('filterChecked')
            }
            todos[indexCheckElement].isComplate = candation
            localStorage.setItem('todos', JSON.stringify(todos))
            pcses()
        })
    };
    function pcses() {
        let todosArr = JSON.parse(localStorage.getItem('todos'))
        if (!localStorage.getItem('todos') || todosArr.length === 0) {
            pcsOfTodos.textContent = '';
            pcsOfComplatedTodos.textContent = '';
            return;
        };

        const check = document.querySelectorAll('.checkBox i')
        let index = 0

        if (!todosArr)
            return;
        todosArr.forEach(item => {
            if (item.isComplate === true) {
                index++;
            };
        });

        for (let index = 0; index < check.length; index++) {
            if (check[index].classList.contains('fa-check')) {

            }

        }
        pcsOfTodos.textContent = 'تعدا فعالیت ها : ' + todosArr.length;
        pcsOfComplatedTodos.textContent = 'تعداد انجام شده ها : ' + index;
        // if(todosArr.length === index){

        // }
    };
    function removeComplatedTodo(indexes) {
        let todos = JSON.parse(localStorage.getItem('todos'))
        todos = todos.filter((todo, index) => {
            return !indexes.includes(index)
        })
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    makeTodoElelemnt(JSON.parse(localStorage.getItem('todos')));
    pcses();

    TodosContaner.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('item') && !e.target.classList.contains('drangging')) {
            const dranggingItem = document.querySelector('.drangging');
            const items = [...TodosContaner.querySelectorAll('.item')];
            const currPosition = items.indexOf(dranggingItem);
            const newPositon = items.indexOf(e.target);
            if (currPosition > newPositon) {
                TodosContaner.insertBefore(dranggingItem, e.target)
            } else {
                TodosContaner.insertBefore(dranggingItem, e.target.nextSibling)
            }
            const todos = JSON.parse(localStorage.getItem('todos'))
                , removed = todos.splice(currPosition, 1);
            todos.splice(newPositon, 0, removed[0])
            localStorage.setItem('todos', JSON.stringify(todos))

        };
    });

    switchBackgroundMod.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            switchBackgroundMod.children[0].classList.add('fa-sun')
            switchBackgroundMod.children[0].classList.remove('fa-moon')
        } else {
            switchBackgroundMod.children[0].classList.add('fa-moon')
            switchBackgroundMod.children[0].classList.remove('fa-sun')
        };
    });

    addTodo.addEventListener('click', () => {
        const item = nameTodo.value.trim();
        if (!item)
            return;

        const todos = !localStorage.getItem('todos')
            ? []
            : JSON.parse(localStorage.getItem('todos'));
        const currentTodo = {
            item: item,
            isComplate: false
        };

        todos.push(currentTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        htmlTags(item);
        pcses();
        nameTodo.value = '';
        nameTodo.dir = 'rtl';
    });

    nameTodo.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            addTodo.click()
        }
        if(!nameTodo.value)
            nameTodo.dir = 'rtl'
        else
            nameTodo.dir = 'auto'
    });
    if (navigator.platform !== 'Win32') {
        let span = document.createElement('span')
        span.textContent = '(در دوایس شما این قابلیت کار نمی کند!!!)';
        onlyPc.parentElement.appendChild(span)
    }

    function clearClasses() {
        let parent = allItem.parentElement
        for (let index = 0; index < parent.children.length; index++) {
            parent.children[index].classList.remove('active')
        }
    }

    allItem.addEventListener('click', () => {
        const items = [...document.querySelectorAll('.item')]
        if (!items)
            return
        checkedBtn = false
        uncheckedBtn = false
        let parent = allItem.parentElement
        for (let index = 0; index < parent.children.length; index++) {
            parent.children[index].classList.remove('active')
        }
        for (let index = 0; index < items.length; index++) {
            items[index].classList.add('allItem')
            items[index].classList.remove('filterUnchecked')
            items[index].classList.remove('filterChecked')
        }
        allItem.classList.add('active')
    })
    checkedItem.addEventListener('click', () => {
        let todos = JSON.parse(localStorage.getItem('todos'))
        if (!todos)
            return
        checkedBtn = true
        uncheckedBtn = false
        const items = [...document.querySelectorAll('.item')]
        todos.forEach((item, index) => {
            items[index].classList.remove('allItem')
            items[index].classList.remove('filterUnchecked')
            if (todos[index].isComplate === true) {
                items[index].classList.add('filterChecked')
            }
        });
        clearClasses()
        checkedItem.classList.add('active')

    })

    ubCheckedItem.addEventListener('click', () => {
        let todos = JSON.parse(localStorage.getItem('todos'));
        if (!todos)
            return
        checkedBtn = false
        uncheckedBtn = true
        clearClasses();
        const items = [...document.querySelectorAll('.item')]
        todos.forEach((item, index) => {
            items[index].classList.remove('allItem');
            items[index].classList.remove('filterChecked');

            if (todos[index].isComplate === false) {
                checkedItemsIndex.push(index);
                items[index].classList.add('filterUnchecked');
            }
        });
        ubCheckedItem.classList.add('active');

    });
    clearCheckedItems.addEventListener('click', () => {
        let deletedItem = [];
        document.querySelectorAll('.item.checked').forEach((item) => {
            deletedItem.push([...document.querySelectorAll('.item')].indexOf(item))
            item.style = 'animation:uls 0.3s ease-in'
            item.addEventListener('animationend', () => {
                item.remove()
            })
        });
        removeComplatedTodo(deletedItem);
        pcses();
    });
}
document.addEventListener('DOMContentLoaded', main)
