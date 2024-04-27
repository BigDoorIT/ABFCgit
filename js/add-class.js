
    function showSelect() {
        const select = document.getElementById('options');
        select.classList.remove('hidden');
        select.addEventListener('change', handleSelectChange);
    }

    function isDefaultOption(value) {
        return value === "";
    }

    function isDuplicateLabel(label) {
        const inputLabels = document.querySelectorAll('.input-field label');
        for (let i = 0; i < inputLabels.length; i++) {
            if (inputLabels[i].textContent === label) {
                return true;
            }
        }
        return false;
    }

    // function hideAddClassButton() {
    //     const select = document.getElementById('options');
    //     const options = select.querySelectorAll('option:not([value=""])');
    //     const inputLabels = document.querySelectorAll('.input-field label');
    //     if (options.length === inputLabels.length) {
    //         document.getElementById('addClassButton').classList.add('hidden');
    //     }
    // }

    function handleSelectChange(event) {
        const selectedOption = event.target.selectedOptions[0];
        const inputValue = selectedOption.value;
        const inputLabel = selectedOption.textContent;

        if (!isDefaultOption(inputValue) && !isDuplicateLabel(inputLabel)) {
            const inputContainer = document.getElementById('inputContainer');
            const inputContainer2 = document.getElementById('inputContainer2'); // Get second container

            // Create a new div for input field
            const inputDiv = document.createElement('div');
            inputDiv.classList.add('input-field');
            inputDiv.innerHTML = `
                <label>${inputLabel}</label>
                <input type="text" >
            `;
            inputContainer.appendChild(inputDiv);
            inputContainer2.appendChild(inputDiv.cloneNode(true)); // Append cloned input field to second container

             // Check if the number of input fields in inputContainer is three
        if (inputContainer.querySelectorAll('.input-field').length === 3) {
            document.getElementById('addClassButton').classList.add('hidden');
        }

            // Set select dropdown back to default value
            const select = document.getElementById('options');
            select.selectedIndex = 0;

            // Hide the select field after adding the input field
            select.classList.add('hidden');

            // Check if all options have been added as input fields and hide the button if so
            // hideAddClassButton();
            

            // Update select fields in table rows
            updateSelectFields();
        } else if (isDuplicateLabel(inputLabel)) {
            alert("Input field with this label already exists!");
        }
    }

    function updateSelectFields() {
        const inputLabels = document.querySelectorAll('.input-field label');
        const tableRows = document.querySelectorAll('#tableBody tr');

        inputLabels.forEach((label, index) => {
            const options = label.textContent;

            // Create an array to store unique options for each select field
            const uniqueOptions = [];

            // Collect unique options from input fields
            inputLabels.forEach((label) => {
                if (!uniqueOptions.includes(label.textContent)) {
                    uniqueOptions.push(label.textContent);
                }
            });

            // Update options for each select field in table rows
            tableRows.forEach((row) => {
                const selectCell = row.querySelector('.class1');

                if (selectCell) {
                    // If select field doesn't exist in this row, create one
                    if (!selectCell.querySelector('select')) {
                        const select = document.createElement('select');
                        selectCell.appendChild(select);
                        
                        // Add default options only to class1 select field
                        if (selectCell.classList.contains('class1')) {
                            const defaultOptions = ["economy", "cockpit", "crew"];
                            defaultOptions.forEach(optionText => {
                                const option = document.createElement('option');
                                option.value = optionText;
                                option.textContent = optionText.charAt(0).toUpperCase() + optionText.slice(1);
                                select.appendChild(option);
                            });
                        }
                    }

                    // Clear existing options in select field
                    const select = selectCell.querySelector('select');
                    select.innerHTML = '';

                    // Add unique options to select field
                    uniqueOptions.forEach((optionText) => {
                        const option = document.createElement('option');
                        option.value = optionText;
                        option.textContent = optionText.charAt(0).toUpperCase() + optionText.slice(1);
                        select.appendChild(option);
                    });
                }
            });
        });
    }
