import { memo } from "react"
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, LayoutList, ClipboardMinus, BookUser, CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const LinksMenu = () => {
    const { t } = useTranslation();
    return (
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>{t("pglnks")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 gap-4">
                    <Link href="/customers">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            {t("cstmrs")}
                        </Button>
                    </Link>
                    <Link href="/suppliers">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            {t("splrs")}
                        </Button>
                    </Link>
                    <Link href="/items">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <LayoutList className="h-4 w-4 mr-2" />
                            {t("itms")}
                        </Button>
                    </Link>
                    {/* <Link href="tickets">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <Ticket className="h-4 w-4 mr-2" />
                            All Tickets
                        </Button>
                    </Link>
                    <Link href="tickets/reports">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <ClipboardMinus className="h-4 w-4 mr-2" />
                            Tickets Report
                        </Button>
                    </Link>
                    <Link href="users">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <CircleUserRound className="h-4 w-4 mr-2" />
                            Users
                        </Button>
                    </Link>
                    <Link href="clients">
                        <Button variant="outline" className="h-12 w-full cursor-pointer">
                            <BookUser className="h-4 w-4 mr-2" />
                            Clients
                        </Button>
                    </Link> */}
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(LinksMenu)