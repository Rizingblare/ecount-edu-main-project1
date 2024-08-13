export function updateSelectedProds(event) {
    const selectedProdItemsDTO = event.data.selectedProdItemsDTO;
    if (selectedProdItemsDTO && selectedProdItemsDTO.length > 0) {
        generateSelectedProdItemElement(selectedProdItemsDTO);
   }
}

export function generateSelectedProdItemElement(prodDTOs) {
    const container = document.getElementById('selectedProdsContainer');
    container.innerHTML = '';
    prodDTOs.forEach(prodDTO => {
        const selectedProdElement = document.createElement('span');
        selectedProdElement.textContent = prodDTO["prodName"] + '(' + prodDTO["prodCode"] + ') [X]';
        selectedProdElement.dataset.prodCode = prodDTO["prodCode"];
        selectedProdElement.dataset.prodName = prodDTO["prodName"];
        selectedProdElement.classList.add('selectedProdItem');
        selectedProdElement.onclick = function() {
            container.removeChild(selectedProdElement);
        }
        container.appendChild(selectedProdElement);
    });
}


export function submitProdItemByLink(target) {
    const prodElement = target.closest('tr');

    const selectedProdDTO = {
        prodCode: prodElement.dataset.prodCode,
        prodName: prodElement.dataset.prodName
    };

    if (window.opener) {
        window.opener.postMessage({ selectedProdItemsDTO: [ selectedProdDTO ] }, '*');
        window.close();
    }
    else {
        alert(ALERT_EVENT_MESSAGES.NO_PARENT_WINDOW);
    }
}

export function submitProdItemsByBtn() {
    const checkboxes = document.querySelectorAll('#mainList .selectIndividualCheckbox input[type="checkbox"]');
    const selectedProdItemsDTO = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            const prodElement = checkbox.closest('.item');
            return {
                prodCode: prodElement.dataset.prodCode,
                prodName: prodElement.dataset.prodName
            };
        });
    if (selectedProdItemsDTO.length === 0) {
        alert(ALERT_EVENT_MESSAGES.NO_SELECTED_PROD);
    }
    else {
        if (window.opener) {
            window.opener.postMessage({ selectedProdItemsDTO: selectedProdItemsDTO }, '*');
        }
        window.close();
    }
}
