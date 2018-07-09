import AsdBannerConfigActivity from "../view/master_station_management/asd.banner.config.activity";
import CooperativePartnerActivity
    from "../view/master_station_management/cooperative.partner.activity";
import SecondClassClassificationActivity
    from "../view/classification_management/second.class.classification.activity";
import FirstClassClassificationActivity
    from "../view/classification_management/first.class.classification.activity";
import ExampleOfAntDesignButton from "../view/zzzzdemo/general/ExampleOfAntDesignButton";
import DemandOrderActivity from "../view/order_management/demand.order.activity";
import CommodityOrderActivity from "../view/order_management/commodity.order.activity";
import MembershipSystemActivity from "../view/member_management/membership.system.activity";
import MembersViewActivity from "../view/member_management/members.view.activity";
import RealNameAuthenticationActivity
    from "../view/member_management/real.name.authentication.activity";
import WelcomeActivityComponent from "../view/WelcomeActivityComponent";
import CertificateChainTemplateSettingActivity
    from "../view/other_settings/certificate.chain.template.setting.activity";
import ExampleOfAntDesignIcon from "../view/zzzzdemo/general/ExampleOfAntDesignIcon";
import MinistrationPersonnelActivity from "../view/system_setup/ministration.personnel.activity";
import AsdPagerConfigActivity from "../view/master_station_management/asd.pager.config.activity";
import RandomStringUtil from "../utils/string/random.string.util";
import PublishClassClassificationActivity
    from "../view/classification_management/publish.class.classification.activity";
import OrderCommondityActivity from "../view/release_management/order.commondity.activity";
import OrderDemandActivity from "../view/release_management/order.demand.activity";
import OrderServiceActivity from "../view/release_management/order.service.activity";


export default class RouteRouterMange {



    static  AppRoutes = [
        {
            key: RandomStringUtil.randomString(12),
            path: "/",
            component: WelcomeActivityComponent
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/demo/ExampleOfAntDesignButton",
            component: ExampleOfAntDesignButton,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/demo/ExampleOfAntDesignIcon",
            component: ExampleOfAntDesignIcon,
        },
        //1.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/master/station/management/page/banner",
            component: AsdBannerConfigActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/master/station/management/page/asdads",
            component: AsdPagerConfigActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/master/station/management/cooperative/partner",
            component: CooperativePartnerActivity,
        },
        //2.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/classification/management/first/class/classification",
            component: FirstClassClassificationActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/classification/management/second/class/classification",
            component: SecondClassClassificationActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/classification/management/publish/class/classification",
            component: PublishClassClassificationActivity,
        },
        //3.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/order/management/commodity/order",
            component: CommodityOrderActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/order/management/demand/order",
            component: DemandOrderActivity,
        },
        //4.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/member/management/membership/system",
            component: MembershipSystemActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/member/management/members/view",
            component: MembersViewActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/member/management/real/name/authentication",
            component: RealNameAuthenticationActivity,
        },

        //5.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/release/management/order/commondity",
            component: OrderCommondityActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/release/management/order/service",
            component: OrderServiceActivity,
        },
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/release/management/order/demand",
            component: OrderDemandActivity,
        },



        //5.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/system/setup/ministration_personnel",
            component: MinistrationPersonnelActivity,
        },
        //6.
        {
            key: RandomStringUtil.randomString(12),
            path: "/view/other/settings/certificate/chain/template/setting",
            component: CertificateChainTemplateSettingActivity,
        }
    ];

    static pushRouter(path, component) {
        if (path && component) {
            RouteRouterMange.AppRoutes.push(
                {
                    path: path,
                    component: component,
                }
            );
            return true;
        }
        return false;
    }

    static popRouter(path, component) {
        if (path && component) {
            RouteRouterMange.AppRoutes.remove({
                path: path,
                component: component,
            });
            return true;
        }
        return false;
    }
}