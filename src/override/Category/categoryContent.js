import React, {Fragment, Suspense} from 'react';
import {array, number, shape, string} from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {useCategoryContent} from '@magento/peregrine/lib/talons/RootComponents/Category';

import {mergeClasses} from '@magento/venia-ui/lib/classify';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import Gallery from '@magento/venia-ui/lib/components/Gallery';
import {Title} from '@magento/venia-ui/lib/components/Head';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import ProductSort from '@magento/venia-ui/lib/components/ProductSort';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import defaultClasses from '@magento/venia-ui/lib/RootComponents/Category/category.css';
import NoProductsFound from '@magento/venia-ui/lib/RootComponents/Category/NoProductsFound';
import {useRelatedCategory} from "./useRelatedCategory";
import FloatBoxes from "../Component/Float/FloatBoxes";
import Sidebar from "../Component/SideBar/Sidebar";
import HorizontalDisplay from "../Component/Horizontal/HorizontalDisplay";

const FilterModal = React.lazy(() => import('@magento/venia-ui/lib/components/FilterModal'));

const CategoryContent = props => {
    const {categoryId, data, pageControl, sortProps, pageSize} = props;
    const [currentSort] = sortProps;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        pageSize
    });

    const {
        categoryName,
        categoryDescription,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData
    } = talonProps;

    const before_content_talons = useRelatedCategory({
        location: 'before-content',
        categoryId: categoryId
    })

    const after_content_talons = useRelatedCategory({
        location: 'after-content',
        categoryId: categoryId
    })

    const left_popup_talons = useRelatedCategory({
        location: 'left-popup-content',
        categoryId: categoryId
    })

    const right_popup_talons = useRelatedCategory({
        location: 'right-popup-content',
        categoryId: categoryId
    })

    const before_sidebar_talons = useRelatedCategory({
        location: 'before-sidebar',
        categoryId: categoryId
    })

    const after_sidebar_talons = useRelatedCategory({
        location: 'after-sidebar',
        categoryId: categoryId
    })


    const classes = mergeClasses(defaultClasses, props.classes);

    const maybeFilterButtons = filters ? (
        <Button
            priority={'low'}
            classes={{root_lowPriority: classes.filterButton}}
            onClick={handleOpenFilters}
            onFocus={handleLoadFilters}
            onMouseOver={handleLoadFilters}
            type="button"
        >
            <FormattedMessage
                id={'categoryContent.filter'}
                defaultMessage={'Filter'}
            />
        </Button>
    ) : null;

    const maybeSortButton =
        totalPagesFromData && filters ? (
            <ProductSort sortProps={sortProps}/>
        ) : null;

    const maybeSortContainer =
        totalPagesFromData && filters ? (
            <div className={classes.sortContainer}>
                <FormattedMessage
                    id={'categoryContent.itemsSortedBy'}
                    defaultMessage={'Items sorted by '}
                />
                <span className={classes.sortText}>
                    <FormattedMessage
                        id={currentSort.sortId}
                        defaultMessage={currentSort.sortText}
                    />
                </span>
            </div>
        ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters}/> : null;

    const categoryDescriptionElement = categoryDescription ? (
        <RichContent html={categoryDescription}/>
    ) : null;

    const content = totalPagesFromData ? (
        <Fragment>
            <section className={classes.gallery}>
                <Gallery items={items}/>
            </section>
            <div className={classes.pagination}>
                <Pagination pageControl={pageControl}/>
            </div>
        </Fragment>
    ) : (
        <NoProductsFound categoryId={categoryId}/>
    );

    return (
        <Fragment>
            <Breadcrumbs categoryId={categoryId}/>

            <HorizontalDisplay {...before_content_talons}/>

            <Title>{pageTitle}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{categoryName}</div>
                </h1>
                {categoryDescriptionElement}
                <div className={classes.headerButtons}>
                    {maybeFilterButtons}
                    {maybeSortButton}
                </div>
                {maybeSortContainer}

                {content}

                <HorizontalDisplay {...after_content_talons}/>

                <FloatBoxes {...left_popup_talons}/>
                <FloatBoxes {...right_popup_talons}/>

                <Sidebar {...before_sidebar_talons}/>
                <Sidebar {...after_sidebar_talons}/>


                <Suspense fallback={null}>{modal}</Suspense>
            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        sortContainer: string,
        gallery: string,
        headerButtons: string,
        filterButton: string,
        pagination: string,
        root: string,
        title: string
    }),
    // sortProps contains the following structure:
    // [{sortDirection: string, sortAttribute: string, sortText: string},
    // React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}]
    sortProps: array,
    pageSize: number
};
