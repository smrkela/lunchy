import httpService from "../services/HttpService";

export default class GroupsApi {

    static async loadByUserId(userId) {

        const memberGroupsUrl = `member-groups/${userId}`;
        const memberGroupsResponse = await httpService.get(memberGroupsUrl);
        const groupsIds = Object.keys(memberGroupsResponse.data);

        const promises = groupsIds.map(it => httpService.get("groups/" + it));

        const groupsResponse = await Promise.all(promises);

        const groups = groupsResponse.map(it => it.data);

        for (let i = 0; i < promises.length; i++) {
            groups[i].id = groupsIds[i];
        }

        return groups;
    }

    static async insertGroup(group) {

        const response = await httpService.post("groups", group);

        await GroupsApi.addGroupMember(response.data.name, group.author, group.author);

        return response;
    }

    static async addGroupMember(groupId, userId, author) {

        // now we need to save group-member and member-group relationship
        const relationship = { author: author, created: new Date().getTime() };

        const groupMemberResponse = await httpService.put(`group-members/${groupId}/${userId}`, relationship);
        const memberGroupResponse = await httpService.put(`member-groups/${userId}/${groupId}`, relationship);

        return true;
    }

}