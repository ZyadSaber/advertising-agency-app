// /app/api/locales/[lng]/[ns]/route.js

import { NextResponse } from "next/server";

const locales = {
  en: {
    wlcmbck: "Welcome Back",
    sgnintoyracnttocntn: "Sign in to your account to continue",
    sgnin: "Sign In",
    entryrcrdntlsblwtoacsyracnt:
      "Enter your credentials below to access your account",
    usrnm: "User Name",
    pswrd: "Password",
    ldng: "Loading",
    hrswhtshpngwthyracnttdy: "Here's what's happening with your account today",
    cshflws: "Cash flows",
    incm: "Income",
    pglnks: "Page Links",
    cstmrs: "Customers",
    cstmrnm: "Customer name",
    srch: "Search",
    actns: "Actions",
    edt: "Edit",
    dlt: "Delete",
    id: "ID",
    phn: "Phone",
    adrs: "Address",
    actv: "Active",
    crdat: "Create At",
    uptdat: "Updated At",
    prvs: "Previous",
    nxt: "Next",
    total: "Total",
    addnew: "Add New",
    splrs: "Suppliers",
    splrnm: "Supplier Name",
    itms: "Items",
    itmnm: "Item Name",
    dtls: "Details",
    cncl: "Cancel",
    save: "Save",
    lgt: "Logout",
    prchsinvc: "Purchase Invoice",
  },
  ar: {
    wlcmbck: "مرحبا بك",
    sgnintoyracnttocntn: "قم بتسجيل الدخول إلى حسابك للمتابعة",
    sgnin: "تسجيل الدخول",
    entryrcrdntlsblwtoacsyracnt:
      "أدخل بيانات الاعتماد الخاصة بك أدناه للوصول إلى حسابك",
    usrnm: "اسم المستخدم",
    pswrd: "كلمة المرور",
    ldng: "جاري التحميل",
    hrswhtshpngwthyracnttdy: "إليك ما يحدث مع حسابك اليوم",
    cshflws: "التدفقات النقدية",
    incm: "الدخل",
    pglnks: "روابط الصفحات",
    cstmrs: "العملاء",
    cstmrnm: "اسم العميل",
    srch: "ابحث",
    actns: "فعل",
    edt: "تعديل",
    dlt: "حذف",
    id: "معرف",
    phn: "هاتف",
    adrs: "العنوان",
    actv: "فعال",
    crdat: "انشئ في",
    uptdat: "حدث في",
    prvs: "السابق",
    nxt: "التالي",
    total: "الاجمالي",
    addnew: "اضافة جديد",
    splrs: "الموردين",
    splrnm: "اسم المورد",
    itms: "الاصناف",
    itmnm: "اسم الصنف",
    dtls: "التفاصيل",
    cncl: "الغاء",
    save: "حفظ",
    lgt: "تسجيل الخروج",
    prchsinvc: "فاتورة شراء",
  },
};

export async function GET(request, { params }) {
  const { lng } = await params;

  const translations = locales?.[lng] || {};

  return NextResponse.json(translations);
}
