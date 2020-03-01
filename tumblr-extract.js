window.blog = {
    title: {JSTitle},
    desc: {
        rich: {JSDescription},
        meta: {JSMetaDescription}
    },
    url: {JSBlogURL},
    rss: {JSRSS},
    favicon: {JSFavicon},
    portrait: {
        '16': {JSPortraitURL-16},
        '24': {JSPortraitURL-24},
        '30': {JSPortraitURL-30},
        '40': {JSPortraitURL-40},
        '48': {JSPortraitURL-48},
        '64': {JSPortraitURL-64},
        '96': {JSPortraitURL-96},
        '128': {JSPortraitURL-128}
    },
    copyright: {JSCopyrightYears},
    global_appearance: {
        title_font: {JSTitleFont},
        title_font_weight: {JSTitleFontWeight},
        background_color: {JSBackgroundColor},
        title_color: {JSTitleColor},
        accent_color: {JSAccentColor},
        header_image: {JSHeaderImage},
        avatar_shape: {JSAvatarShape},
        booleans: {
            show_title: {block:ShowTitle}true{/block:ShowTitle}{block:HideTitle}false{/block:HideTitle},
            show_desc: {block:ShowDescription}true{/block:ShowDescription}{block:HideDescription}false{/block:HideDescription},
            show_avatar: {block:ShowAvatar}true{/block:ShowAvatar}{block:HideAvatar}false{/block:HideAvatar},
            show_header_image: {block:ShowHeaderImage}true{/block:ShowHeaderImage}{block:HideHeaderImage}false{/block:HideHeaderImage}
        }
    },
    navigation: {
        current: {JSCurrentPage},
        {block:Pagination}
        {block:PreviousPage}
        prev: {JSPreviousPage},
        {/block:PreviousPage}
        {block:NextPage}
        next: {JSNextPage},
        {/block:NextPage}
        {/block:Pagination}
        total_pages: {JSTotalPages},
        {block:SubmissionsEnabled}
        submit_label: {JSSubmitLabel},
        {/block:SubmissionsEnabled}
        {block:AskEnabled}
        ask_label: {JSAskLabel},
        {/block:AskEnabled}
    },
    {block:HasPages}
    custom_pages: [
    {block:Pages}
    {
        url: {JSURL},
        label: {JSLabel}
    },
    {/block:Pages}
    ],
    {/block:HasPages}
    current_page: {
        {block:PermalinkPage}
        {block:PostTitle}
        permalink_post_title: {JSPostTitle},
        {/block:PostTitle}
        {block:PostSummary}
        permalink_post_summary: {JSPostSummary},
        {/block:PostSummary}
        {/block:PermalinkPage}
        {block:PermalinkPagination}
        {block:PreviousPost}
        permalink_prev_post: {JSPreviousPost},
        {/block:PreviousPost}
        {block:NextPost}
        permalink_next_Post: {JSNextPost},
        {/block:NextPost}
        {/block:PermalinkPagination}
    },
    posts: [
    {block:Posts}
        {
            post_type: {JSPostType},
            permalink: {JSPermalink},
            short_url: {JSShortURL},
            embed_url: {JSEmbedURL},
            post_id: {JSPostID},
            tags_as_classes: {JSTagsAsClasses},
            notes_partial: {JSPostNotesURL},
            {block:NoteCount}
            note_count: {
                plain: {JSNoteCount},
                with_label: {JSNoteCountWithLabel}
            },
            {/block:NoteCount}
            {block:Date}
            date: {
                day_of_month: {JSDayOfMonth},
                day_of_month_zero: {JSDayOfMonthWithZero},
                day_of_week: {JSDayOfWeek},
                short_day_of_week: {JSShortDayOfWeek},
                day_of_week_number: {JSDayOfWeekNumber},
                day_of_month_suffix: {JSDayOfMonthSuffix},
                day_of_year: {JSDayOfYear},
                week_of_year: {JSWeekOfYear},
                month: {JSMonth},
                short_month: {JSShortMonth},
                month_number: {JSMonthNumber},
                month_number_zero: {JSMonthNumberWithZero},
                year: {JSYear},
                short_year: {JSShortYear},
                ampm: {JSAmPm},
                ampm_capital: {JSCapitalAmPm},
                h12: {JS12Hour},
                h24: {JS24Hour},
                h12_zero: {JS12HourWithZero},
                h24_zero: {JS24HourWithZero},
                min: {JSMinutes},
                sec: {JSSeconds},
                beat: {JSBeats},
                time: {JSTimestamp},
                relative_time: {JSTimeAgo}
            },
            {/block:Date}
            buttons: {
              like: {JSLikeButton size="20" color="white"},
              reblog: {JSReblogButton size="20" color="white"}
            },
            npf: {NPF}
        },
    {/block:Posts}
    ]
};
