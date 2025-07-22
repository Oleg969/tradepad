const scriptURL = 'https://script.google.com/macros/s/AKfycbzDv9EhQZtT768l_x0CcMZHWFIA5-a6hXd5joplPTPb2zOFRgEOkFwoVHaZ-nq8iyBK2Q/exec'; // ← Вставь сюда свой URL

    function saveTable() {
      const table = document.getElementById('dealsTable');
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = {
          who: cells[0].innerText,
          pair: cells[1].innerText,
          reason: cells[2].innerText,
          entryPercent: cells[3].innerText,
          side: cells[4].innerText,
          profit: cells[5].innerText,
          percent: cells[6].innerText,
          screenshots: cells[7].innerText
        };

        fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(rowData),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
          console.log("Успешно:", data);
        })
        .catch(error => {
          console.error("Ошибка:", error);
        });
      });
    }

    // Назначаем функцию после загрузки DOM
    document.getElementById('saveBtn').addEventListener('click', saveTable);

function addRow() {
    const table = document.getElementById("dealsTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();

    const reasons4 = [
        "Эдуардо",
        "Назар",
        "Олег"
    ];

    const reasons = [
      "GER40",
      "EURUSD",
      "XAUUSD"
    ];
  
    const reasons1 = [
        "IFVG",
        "FVG",
        "Фрактал"
      ];
    const reasons2 = [
        "0.1",
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1",
        "1.5",
        "2"
    ];  
    const reasons3 = [
        "LONG",
        "SHORT"
      ];  
    
    const data = [
      "кто",
      "НОВЫЙ",      // Тикер
      "SELECT",     // <- специальная метка
      "x1,00",      // Плечо
      "LONG",       // Сторона
      "0.0 $",    // Прибыль
      "0.0%",     // Процент,
      "тут будут скрины",    // Чистая прибыль
    ];

    function recalculateBalance() {
        // Твоя логика суммы прибыли и обновления поля баланса
      
        // ...
      
        recalculatePercentages(); // добавлено!
    }
    document.getElementById("dealsTable").addEventListener("input", () => {
        recalculatePercentages();
      });
      
      // При вводе в поле баланса
      document.getElementById("balanceInput").addEventListener("input", () => {
        recalculatePercentages();
      });

      function updateProfitCellClass(cell) {
        const text = cell.textContent.replace(/[^\d\.\-]/g, ''); // очищаем от всего, кроме цифр, точек и минусов
        const value = parseFloat(text);
      
        if (!isNaN(value)) {
          if (value > 0) {
            cell.classList.add("positive");
            cell.classList.remove("negative");
          } else if (value < 0) {
            cell.classList.add("negative");
            cell.classList.remove("positive");
          } else {
            cell.classList.remove("positive", "negative");
          }
        } else {
          cell.classList.remove("positive", "negative");
        }
      }
      
      // Навешиваем обработчик на tbody, делегируем клик/ввод
      document.querySelector("#dealsTable tbody").addEventListener("input", (event) => {
        const cell = event.target;
        // Проверяем, что это именно ячейка "Прибыль ($)" — 6-й столбец (index 5)
        if (cell.cellIndex === 5) {
          updateProfitCellClass(cell);
        }
      });

    document.getElementById("dealsTable").addEventListener("input", function (e) {
        recalculateBalance();
      });
      function getBalance() {
        const balanceInput = document.getElementById("balanceInput");
        const rawValue = balanceInput.value.replace(/[^\d\.\-]/g, '');
        return parseFloat(rawValue) || 0;
      }
    function recalculatePercentages() {
        const table = document.getElementById("dealsTable").getElementsByTagName("tbody")[0];
        const rows = table.getElementsByTagName("tr");
        const balance = getBalance();
        let totalProfit = 0;
      
        for (let row of rows) {
            const cells = row.getElementsByTagName("td");
            const profitCell = cells[5]; // столбец "прибыль ($)"
            if (profitCell) {
              const raw = profitCell.textContent.replace(/[^\d\.\-]/g, '');
              const value = parseFloat(raw);
              if (!isNaN(value)) {
                totalProfit += value;
              } 
            }
        }
        const baseBalance = 25000.0; // начальный баланс (можно поменять или сделать вводимым)
        const finalBalance = baseBalance + totalProfit;

        const balanceField = document.getElementById("balanceInput");
        balanceField.value = `${finalBalance.toFixed(2)} $`;

        for (let row of rows) {
            const cells = row.getElementsByTagName("td");
            const profitCell = cells[5];   // Прибыль ($)
            const percentCell = cells[6];  // Процент (%)

        if (profitCell && percentCell) {
            const profitText = profitCell.textContent.replace(/[^\d\.\-]/g, '');
            const profit = parseFloat(profitText);

            if (!isNaN(profit) && balance !== 0) {
                const percent = (profit / balance) * 100;
                percentCell.textContent = `${percent.toFixed(2)}%`;
                percentCell.className = percent >= 0 ? "positive" : "negative";
            }  else {
                percentCell.textContent = "0.00%";
                percentCell.className = "";
                }
            }
        }
    }

    document.getElementById("dealsTable").addEventListener("input", function (e) {
        recalculateBalance();           // если ты суммируешь прибыль
        recalculatePercentages();       // всегда обновляем процент
    });

    data.forEach((text, index) => {
      const cell = row.insertCell();
      
      if (index === 0) {
        // Поле "Причина входа" — обычный выпадающий список
        const select = document.createElement("select");
        select.style.width = "100%";
  
        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Выбери себя";
        select.appendChild(defaultOption);
  
        reasons4.forEach(reason4 => {
          const option = document.createElement("option");
          option.value = reason4;
          option.textContent = reason4;
          select.appendChild(option);
        });

        select.addEventListener("change", () => {
            cell.title = select.value;
          });
        cell.appendChild(select);
      }

      else if (index === 1) {
        // Поле "Причина входа" — обычный выпадающий список
        const select = document.createElement("select");
        select.style.width = "100%";
  
        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Выберите пару";
        select.appendChild(defaultOption);
  
        reasons.forEach(reason => {
          const option = document.createElement("option");
          option.value = reason;
          option.textContent = reason;
          select.appendChild(option);
        });

        select.addEventListener("change", () => {
            cell.title = select.value;
          });
        cell.appendChild(select);
      }

      else if (index === 2) {
        const cellWrapper = document.createElement("div");
      cellWrapper.style.position = "relative";
      cellWrapper.style.width = "100%";
      //cellWrapper.style.zIndex = "1"; // нужно для управления вложенными слоями

        const selectStyled = document.createElement("div");
        selectStyled.textContent = "Выберите причину";
        selectStyled.style.cursor = "pointer";
        selectStyled.style.maxHeight = "40px";
        selectStyled.style.fontSize = "13px";
        selectStyled.style.backgroundColor = "#1e1e1e";
        selectStyled.style.padding = "2px 4px";
        selectStyled.style.border = "1px solid #555";
        selectStyled.style.borderRadius = "15px";
        selectStyled.style.color = "#fff";
        selectStyled.style.userSelect = "none";
        selectStyled.style.zIndex = "100";

        const dropdown = document.createElement("div");
        dropdown.style.position = "absolute";
        dropdown.style.top = "100%";
        dropdown.style.left = "0";
        dropdown.style.width = "100%";
        dropdown.style.backgroundColor = "#1e1e1e";
        dropdown.style.border = "1px solid #555";
        dropdown.style.borderRadius = "4px";
        dropdown.style.padding = "4px";
        dropdown.style.maxHeight = "50px";
        dropdown.style.maxWidth = "auto";
        dropdown.style.overflowY = "auto";
        dropdown.style.zIndex = "9999"; // ВАЖНО: самый высокий уровень
        dropdown.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.6)";
        dropdown.style.display = "none";

        // Добавим чекбоксы
        reasons1.forEach(reason1 => {
          const option = document.createElement("div");
          option.style.display = "flex";
          option.style.alignItems = "center";
          option.style.marginBottom = "4px";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = reason1;

          const label = document.createElement("label");
          label.textContent = reason1;
          label.style.marginLeft = "6px";
          label.style.color = "#fff";

          option.appendChild(checkbox);
          option.appendChild(label);
          dropdown.appendChild(option);
        });

        // Клик по "селекту" — показать/скрыть dropdown
        selectStyled.addEventListener("click", (e) => {
          e.stopPropagation(); // важно!
          // Закрыть другие дропдауны
          document.querySelectorAll(".custom-dropdown").forEach(el => {
            if (el !== dropdown) el.style.display = "none";
          });
          dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
        });

        // При клике вне — закрыть
        document.addEventListener("click", () => {
          dropdown.style.display = "none";
        });

        // Слушаем изменения чекбоксов
        dropdown.addEventListener("change", () => {
          const selected = Array.from(dropdown.querySelectorAll("input:checked")).map(cb => cb.value);
          selectStyled.textContent = selected.length ? selected.join(", ") : "Выберите причину";
          cell.title = selected.join(", ");
        });

        dropdown.classList.add("custom-dropdown");
        cellWrapper.appendChild(selectStyled);
        cellWrapper.appendChild(dropdown);
        cell.appendChild(cellWrapper);
      }
      
      else if (index === 3) {
        // Поле "Причина входа" — обычный выпадающий список
        const select = document.createElement("select");
        select.style.width = "100%";
  
        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Выберите процент";
        select.appendChild(defaultOption);
  
        reasons2.forEach(reason2 => {
          const option = document.createElement("option");
          option.value = reason2;
          option.textContent = reason2;
          select.appendChild(option);
        });
  
        // Можно обновить title или содержимое при выборе
        select.addEventListener("change", () => {
          cell.title = select.value;
        });
  
        cell.appendChild(select);
      } 
      
      else if (index === 4) {
        // Поле "Причина входа" — обычный выпадающий список
        const select = document.createElement("select");
        select.style.width = "100%";
  
        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Выберите сторону";
        select.appendChild(defaultOption);
  
        reasons3.forEach(reason3 => {
          const option = document.createElement("option");
          option.value = reason3;
          option.textContent = reason3;
          select.appendChild(option);
        });
  
        // Можно обновить title или содержимое при выборе
        select.addEventListener("change", () => {
          cell.title = select.value;
        });
  
        cell.appendChild(select);
      } else {
        cell.textContent = text;
      
        // Процент (index 8) — НЕ редактируемый
        if (index === 6) {
          cell.contentEditable = "false";
        } else {
          cell.contentEditable = "true";
        }
      
        if (index === 5) {
          const number = parseFloat(text.replace('%', '').replace(',', '.'));
          if (!isNaN(number)) {
            cell.className = number >= 0 ? "positive" : "negative";  
          }
        }

        else if (index === 7) {
          cell.innerHTML = ""; // очистить
          let allImageSrcs = [];  // массив всех изображений
          let currentImageIndex = 0;

          ////ПРИКОЛЫ СО СКРИНАМИ
          cell.style.verticalAlign = "top";
          const imagesContainer = document.createElement("div");
          imagesContainer.style.display = "flex";
          imagesContainer.style.flexDirection = "column";
          imagesContainer.style.overflowY = "auto";
          imagesContainer.style.maxHeight = "40px";
          imagesContainer.style.width = "80px";
          imagesContainer.style.gap = "6px";
          imagesContainer.style.marginTop = "4px";
          imagesContainer.style.border = "1px solid #ccc";  // можно добавить рамку для визуализации
          imagesContainer.style.borderRadius = "4px";
          imagesContainer.style.padding = "2px";
          cell.appendChild(imagesContainer);

          // Добавляем input type=file (невидимый)
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.multiple = true;
          fileInput.style.display = "none";

          fileInput.addEventListener("change", () => {
            const files = fileInput.files;
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;
                allImageSrcs.push(img.src);
                img.style.width = "70px";
                img.style.height = "auto";
                img.style.border = "1px solid #ccc";
                img.style.borderRadius = "4px";
                img.style.cursor = "pointer";
                img.style.objectFit = "contain";
                img.addEventListener("click", () => openModal(img.src));
                imagesContainer.appendChild(img);
              };
              reader.readAsDataURL(file);
            }
          });

          cell.addEventListener("dblclick", () => fileInput.click());

          // Обработка вставки изображения из буфера обмена (Ctrl+V) — вот добавленный блок:
          cell.addEventListener('paste', (event) => {
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            for (const item of items) {
              if (item.type.indexOf('image') === 0) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function(e) {
                  const imgWrapper = document.createElement("div");
                  imgWrapper.style.position = "relative";
                  imgWrapper.style.display = "inline-block";

                  const img = document.createElement("img");
                  img.src = e.target.result;
                  allImageSrcs.push(img.src);
                  img.style.width = "65px";
                  img.style.border = "1px solid #ccc";
                  img.style.borderRadius = "4px";
                  img.style.cursor = "pointer";
                  img.style.objectFit = "cover";
                  img.addEventListener("click", () => openModal(img.src));

                  // ❌ Кнопка удаления
                  const deleteBtn = document.createElement("span");
                  deleteBtn.textContent = "✕";
                  deleteBtn.title = "Удалить изображение";
                  deleteBtn.style.position = "absolute";
                  deleteBtn.style.top = "2px";
                  deleteBtn.style.right = "2px";
                  deleteBtn.style.background = "rgba(0,0,0,0.6)";
                  deleteBtn.style.color = "#fff";
                  deleteBtn.style.fontSize = "12px";
                  deleteBtn.style.padding = "2px 5px";
                  deleteBtn.style.borderRadius = "50%";
                  deleteBtn.style.cursor = "pointer";
                  deleteBtn.style.zIndex = "10";

                  deleteBtn.addEventListener("click", (event) => {
                    event.stopPropagation(); // чтобы не открыть модал
                    imgWrapper.remove();
                  });

                  imgWrapper.appendChild(img);
                  imgWrapper.appendChild(deleteBtn);
                  imagesContainer.appendChild(imgWrapper);
                };
                reader.readAsDataURL(blob);
                event.preventDefault();
                break; // вставляем только первое изображение
              }
            }
          });

          // Вспомогательная функция открытия модального окна с большим изображением
          function openModal(src) {
          let modal = document.getElementById("imageModal");

          currentImageIndex = allImageSrcs.indexOf(src); // сохраняем индекс текущего изображения

          if (!modal) {
            modal = document.createElement("div");
            modal.id = "imageModal";
            modal.style.position = "fixed";
            modal.style.top = 0;
            modal.style.left = 0;
            modal.style.width = "100vw";
            modal.style.height = "100vh";
            modal.style.backgroundColor = "rgba(0,0,0,0.85)";
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            modal.style.zIndex = "9999";
            modal.style.flexDirection = "column";
            modal.style.gap = "20px";

            const modalContent = document.createElement("div");
            modalContent.style.position = "relative";
            modalContent.style.display = "flex";
            modalContent.style.alignItems = "center";
            modalContent.style.justifyContent = "center";
            modalContent.style.gap = "30px";
            modal.appendChild(modalContent);

            const modalImage = document.createElement("img");
            modalImage.style.maxWidth = "90%";
            modalImage.style.maxHeight = "90%";
            modalImage.style.borderRadius = "10px";
            modalImage.style.boxShadow = "0 0 20px rgba(0,0,0,0.7)";
            modalImage.style.cursor = "default";
            modal.appendChild(modalImage);

            // Кнопка закрытия
            const closeBtn = document.createElement("div");
            closeBtn.textContent = "✕";
            closeBtn.style.position = "absolute";
            closeBtn.style.top = "50px";
            closeBtn.style.right = "50px";
            closeBtn.style.fontSize = "32px";
            closeBtn.style.color = "#fff";
            closeBtn.style.cursor = "pointer";
            closeBtn.style.userSelect = "none";
            closeBtn.style.zIndex = "10000";
            closeBtn.addEventListener("click", () => {
              modal.style.display = "none";
            });
            modal.appendChild(closeBtn);

            // Стрелка влево
            const leftArrow = document.createElement("div");
            leftArrow.textContent = "◀";
            leftArrow.style.fontSize = "48px";
            leftArrow.style.color = "#fff";
            leftArrow.style.cursor = "pointer";
            leftArrow.style.userSelect = "none";
            leftArrow.style.zIndex = "10000";
            leftArrow.addEventListener("click", () => {
              if (currentImageIndex > 0) {
                currentImageIndex--;
                modal.querySelector("#modalImg").src = allImageSrcs[currentImageIndex];
              }
            });
            modal.appendChild(leftArrow);

            // Стрелка вправо
            const rightArrow = document.createElement("div");
            rightArrow.textContent = "▶";
            rightArrow.style.position = "absolute";
            rightArrow.style.right = "20px";
            rightArrow.style.fontSize = "48px";
            rightArrow.style.color = "#fff";
            rightArrow.style.cursor = "pointer";
            rightArrow.style.userSelect = "none";
            rightArrow.style.zIndex = "10000";
            rightArrow.addEventListener("click", () => {
              if (currentImageIndex < allImageSrcs.length - 1) {
                currentImageIndex++;
                modal.querySelector("#modalImg").src = allImageSrcs[currentImageIndex];
              }
            });
            modal.appendChild(rightArrow);

            document.body.appendChild(modal);
          };

          // Если модалки нет — создаем
          //if (!modal) {
          //  createModalIfNeeded();
          //}

           

          const modalImage = modal.querySelector("#modalImg");
          if (modalImage) modalImage.src = src;
          modal.style.display = "flex";
        }

          document.addEventListener("keydown", (e) => {
            const modal = document.getElementById("imageModal");
            if (!modal || modal.style.display !== "flex") return;

            const modalImage = modal.querySelector("#modalImg");

            if (e.key === "Escape") {
              modal.style.display = "none";
            } else if (e.key === "ArrowLeft" && currentImageIndex > 0) {
              currentImageIndex--;
              modalImage.src = allImageSrcs[currentImageIndex];
            } else if (e.key === "ArrowRight" && currentImageIndex < allImageSrcs.length - 1) {
              currentImageIndex++;
              modalImage.src = allImageSrcs[currentImageIndex];
            }
          }); 
        }
      }
    });
    document.getElementById("modalClose").addEventListener("click", () => {
    document.getElementById("imageModal").style.display = "none";
    });
  }
