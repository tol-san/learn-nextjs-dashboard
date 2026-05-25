import React, {Suspense} from 'react'
import {lusitana} from "@/app/ui/font";
import Search from "@/app/ui/search";
import {CreateInvoice} from "@/app/ui/invoices/buttons";
import {InvoicesTableSkeleton} from "@/app/ui/skeletons";
import InvoicesTable from "@/app/ui/invoices/table";
import Pagination from "@/app/ui/invoices/pagination";
import {fetchInvoicesPages} from "@/app/lib/data";

export default async function Page(props: {
    searchParams: Promise<{
        query?: string,
        page?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query)

    return (
        <div className="w-full">
            <div className=" flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 md:mt-8 flex items-center justify-between gap-3">
                <Search placeholder="Search invoice..."/>
                <CreateInvoice/>
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
                <InvoicesTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 w-full flex justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    )
}
