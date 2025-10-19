"use client";

import { memo } from "react";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/components/auth/hooks/useAuth";
import Header from "@/components/header";
import LinksMenu from "./_partials/LinksMenu"

const HomePage = () => {
    const { name, last_login_time } = useAuth();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle="X-Support Dashboard" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {t("wlcmbck")}, {name} ! 👋
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        {t("hrswhtshpngwthyracnttdy")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>{t("cshflws")}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">{t("incm")}</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">المصاريف</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">اخر تسجيل دخول للنظام</span>
                                    <span className="text-slate-900 dark:text-slate-100">{last_login_time}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>تحت التنفيذ</CardTitle>
                        </CardHeader>
                        {/*<CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">New Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Current Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">3</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Other Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-600 dark:text-slate-400">Closed Tickets</span>
                                    <span className="text-slate-900 dark:text-slate-100">0</span>
                                </div>
                            </div>
                        </CardContent> */}
                    </Card>

                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>تحت التنفيذ</CardTitle>
                        </CardHeader>
                        {/* <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-900 dark:text-slate-100">Client 1</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">T270625-0200/1</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-900 dark:text-slate-100">Client 2</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">T270625-0200/2</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-900 dark:text-slate-100">Client 3</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">T270625-0200/3</span>
                                </div>
                            </div>
                        </CardContent> */}
                    </Card>
                </div>

                <LinksMenu />
            </main>
        </div>
    );
};

export default memo(HomePage); 