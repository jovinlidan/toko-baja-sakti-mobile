import printValue from "yup/lib/util/printValue";

export const mixed = {
  default: "Kolom tidak valid",
  required: "Kolom harus diisi",
  oneOf: "Kolom harus salah satu dari: ${values}",
  notOneOf: "Kolom tidak boleh salah satu dari: ${values}",
  notType: ({ path, type, value, originalValue }) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg =
      `Kolom harus tipe \`${type}\`, ` +
      `tetapi nilai akhir berupa: \`${printValue(value, true)}\`` +
      (isCast ? ` (hasil dari \`${printValue(originalValue, true)}\`).` : ".");

    if (value === null) {
      msg +=
        '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`';
    }

    return msg;
  },
};

export const string = {
  length: "Kolom harus ${length} huruf",
  min: "Kolom minimal ${min} huruf",
  max: "Kolom maksimal ${max} huruf",
  matches: 'Kolom harus cocok dengan pola: "${regex}"',
  email: "Kolom harus berisi email yang valid",
  url: "Kolom harus berisi URL yang valid",
  trim: "Kolom harus teks tanpa spasi di awalan dan akhiran",
  lowercase: "Kolom harus teks huruf kecil",
  uppercase: "Kolom harus teks huruf besar",
};

export const number = {
  min: "Kolom minimal sama dengan ${min}",
  max: "Kolom maksimal sama dengan ${max}",
  less: "Kolom harus lebih kecil dari ${less}",
  more: "Kolom harus lebih besar dari ${more}",
  notEqual: "Kolom harus sama dengan ${notEqual}",
  positive: "Kolom harus berupa angka positif",
  negative: "Kolom harus berupa angka negatif",
  integer: "Kolom harus berupa angka",
};

export const date = {
  min: "Kolom harus setelah tanggal ${min}",
  max: "Kolom harus sebelum tanggal ${max}",
};

export const boolean = {};

export const object = {
  noUnknown: "Kolom harus valid sesuai skema",
};

export const array = {
  min: "Kolom minimal harus memiliki ${min} item",
  max: "Kolom maksimal harus memiliki ${max} item",
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
