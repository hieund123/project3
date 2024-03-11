"use strict";

class TableTemplate {
  static fillIn(tableId, dict, columnName) {
    const table = document.getElementById(tableId);
    const headerRow = table.rows[0];

    // Process header row
    for (let i = 0; i < headerRow.cells.length; i++) {
      const cell = headerRow.cells[i];
      cell.innerHTML = this.replaceTemplate(cell.innerHTML, dict);
    }

    if (columnName) {
      const columnIndex = this.getColumnIndex(headerRow, columnName);
      if (columnIndex !== -1) {
        for (let i = 1; i < table.rows.length; i++) {
          const cell = table.rows[i].cells[columnIndex];
          cell.innerHTML = this.replaceTemplate(cell.innerHTML, dict);
        }
      }
    }

    table.style.visibility = "visible";
  }

  static replaceTemplate(template, dict) {
    return template.replace(
      /\{\{(\w+)\}\}/g,
      (match, p1) => dict[p1] || "" 
    );
  }

  static getColumnIndex(headerRow, columnName) {
    for (let i = 0; i < headerRow.cells.length; i++) {
      if (headerRow.cells[i].textContent === columnName) {
        return i;
      }
    }
    return -1; 
  }
}

module.exports = TableTemplate;
