import { PATIENT_STATUS } from './constants';

const getCardColor = (status) => {
    switch (status) {
        case PATIENT_STATUS.SAFE:
            return "var(--green)";
        case PATIENT_STATUS.WANDERING:
            return "var(--red)";
        case PATIENT_STATUS.OUT_OF_SAFE_ZONE:
            return "var(--orange)";
        default:
            return "var(--green)";
    }
}

const parseLastUpdated = (lastUpdated) => {
    const date = new Date(lastUpdated * 1000);
    const now = new Date();
    const diff = now - date;

    // if last updated is more than a day ago, show the date
    if (diff > 24 * 60 * 60 * 1000) {
        return date.toLocaleDateString();
    }

    // if last updated is more than an hour ago, show the hours
    if (diff > 60 * 60 * 1000) {
        return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`;
    }

    // if last updated is more than a minute ago, show the minutes
    if (diff > 60 * 1000) {
        return `${Math.floor(diff / (60 * 1000))} minutes ago`;
    }

    // if last updated is more than a second ago, show the seconds
    let secondsAgo = Math.floor(diff / 1000);

    if (diff > 1000 && secondsAgo > 1) {
        return `${secondsAgo} seconds ago`;
    }

    return `a second ago`;
}

export { getCardColor, parseLastUpdated };